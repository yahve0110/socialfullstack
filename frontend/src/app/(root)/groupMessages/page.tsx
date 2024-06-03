"use client"

import { getGroupChats } from "@/actions/croupChats/getGroups"
import React, { useEffect, useState } from "react"
import PreviewGroupMessage, {
  PreviewGroupMessageType,
} from "../messages/PreviewGroupMessage"
import styles from "./groupMsg.module.css"

export default function GroupMessages() {
  const [groupChats, setGroupChats] = useState<PreviewGroupMessageType[]>([])

  useEffect(() => {
    async function getData() {
      try {
        const groupChatsData = await getGroupChats()

        setGroupChats(groupChatsData)
      } catch (error) {
        console.error("Error fetching chats:", error)
      }
    }
    getData()
  }, [])

  return (
    <div>
      {" "}
      {groupChats && groupChats.length > 0 ? (
        groupChats.map((chat) => (
          <PreviewGroupMessage
            key={chat.chat_id}
            chat_id={chat.chat_id}
            chat_name={chat.chat_name}
          />
        ))
      ) : (
        <div className={styles.noMessages}>No group chats yet...</div>
      )}
    </div>
  )
}
