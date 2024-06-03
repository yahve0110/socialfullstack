"use client"
import styles from "./Messages.module.css"
import { useEffect, useState } from "react"
import { getChats } from "@/actions/privateChat/getChats" 
import PreviewMessage, { PreviewMessageType } from "./PreviewMessage"

import SwitchMessages from "./SwitchMessages"

import GroupMessages from "../groupMessages/page"

export default function Messages() {
  const [chats, setChats] = useState<PreviewMessageType[]>([])

  const [page, setPage] = useState(0)
  useEffect(() => {
    async function getData() {
      try {
        const privateChatsData = await getChats()

        setChats(privateChatsData)
      } catch (error) {
        console.error("Error fetching chats:", error)
      }
    }
    getData()
  }, [])

  return (
    <div className={styles.messages}>
      <div className={styles.messagesContainer}>
        {page === 0 ? (
          chats && chats.length > 0 ? (
            chats.map((chat) => (
              <PreviewMessage
                key={chat.chat_id}
                chat_id={chat.chat_id}
                first_name={chat.first_name}
                last_name={chat.last_name}
                profile_picture={chat.profile_picture}
                last_message={chat.last_message}
                last_message_time={chat.last_message_time}
              />
            ))
          ) : (
            <div className={styles.noMessages}>No private messages yet...</div>
          )
        ) : null}
        {page === 1 && <GroupMessages />}
      </div>
      <SwitchMessages page={page} setPage={setPage} />
    </div>
  )
}
