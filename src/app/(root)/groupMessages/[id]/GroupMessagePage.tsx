"use client"

import styles from "./MessagePage.module.css"
import Image from "next/image"
import { useState, ChangeEvent, useEffect, useRef } from "react"
import Link from "next/link"
import Loader from "@/components/Loader/Loader"
import { usePersonStore } from "@/lib/state/userStore"
import Message from "../../messages/[id]/Message"
import { getGroupChatHistory } from "@/actions/croupChats/getGroupChatHistory"

export default function GroupMessagePage({
  id,
  ws,
}: {
  id: string
  ws: WebSocket
}) {
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  const currentUserId = usePersonStore((state) => state.userID)

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    } else {
    }
  }

  useEffect(() => {
    // Fetch messages or perform any necessary initialization
    async function fetchData() {
      try {
        const chatHistory = await getGroupChatHistory(id)
        setMessages(chatHistory)
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  ws.onmessage = function (event: any) {
    const data = JSON.parse(event.data)
    if (messages && messages.length > 0) {
      setMessages([...messages, data])
    } else {
      setMessages([data])
    }

    scrollToBottom()
  }

  function sendMessage() {
    // Send message logic
    if (!text.trim()) {
      return
    }
    ws.send(
      JSON.stringify({ message: text, user_id: currentUserId, chat_id: id })
    )
    setText("")
    scrollToBottom()
  }

  // Handle text change in the textarea
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    event.target.style.height = "auto"
    event.target.style.height = Math.min(event.target.scrollHeight, 200) + "px"
  }

  // Emoji picker logic
  const emojis = ["😀", "😂", "😊", "😍", "🥰", "😎", "🤩", "😘", "😋", "🤔"] // Add more emojis as needed
  const [showPicker, setShowPicker] = useState(false)

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  const handleEmojiSelect = (emoji: string) => {
    setText(text + emoji)
    togglePicker()
  }

  if (!isLoaded) {
    return <Loader />
  }
  return (
    <div className={styles.messagePageWrapper}>
      {/* Top section */}
      <div className={styles.messagePageContainerUp}>
        <div className={styles.goBackDiv}>
          <Image
            className={styles.arrowImg}
            src="/assets/imgs/arrow.png"
            alt="avatar"
            width={17}
            height={17}
          />
          <Link href="/messages">Back</Link>
        </div>
      </div>

      {/* Middle section - Message container */}
      <div
        className={styles.messagePageContainerMiddle}
        ref={messageContainerRef}
      >
        {messages &&
          messages.map((el, index) => (
            <Message
              key={index}
              chatId={id}
              content={el.content}
              first_name={el.author_name}
              last_name={el.last_name}
              timestamp={el.created_at}
              profile_picture={el.profile_picture}
              message_author_id={el.author_id}
            />
          ))}
      </div>

      {/* Bottom section - Input area and send button */}
      <div className={styles.messagePageContainerBottom}>
        <div className={styles.emojiPicker}>
          <button className={styles.emojiBtn} onClick={togglePicker}>
            😊
          </button>
          {showPicker && (
            <div className={styles.emojiDiv}>
              {emojis.map((emoji, index) => (
                <span
                  className={styles.emojiContainer}
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        <textarea
          onChange={handleTextChange}
          value={text}
          placeholder="Your message..."
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              sendMessage()
            }
          }}
        ></textarea>
        <Image
          className={styles.sendMsgIcon}
          onClick={sendMessage}
          src="/assets/icons/sendMsg.svg"
          alt="avatar"
          width={30}
          height={30}
        />
      </div>
    </div>
  )
}
