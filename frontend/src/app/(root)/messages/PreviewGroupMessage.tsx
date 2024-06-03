import Image from "next/image"
import React from "react"
import styles from "./Messages.module.css"
import Link from "next/link"

export type PreviewGroupMessageType = {
  chat_id: string
  chat_name: string
}

export default function PreviewGroupMessage({
  chat_id,
  chat_name,
}: PreviewGroupMessageType) {
  return (
    <Link href={`groupMessages/${chat_id}`} className={styles.groupChatItem}>

        <Image
          src={
            "https://cdn0.iconfinder.com/data/icons/avatar-1-2/512/group-512.png"
          }
          width={50}
          height={50}
          alt="group avatar"
        />
        <div> {chat_name}</div>
   
    </Link>
  )
}
