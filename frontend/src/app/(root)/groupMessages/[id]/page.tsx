"use client"
import Info from "@/components/Info/Info"
import React from "react"
import GroupMessagePage from "./GroupMessagePage"
import styles from "./MessagePage.module.css"
import { URL_SOCKETS } from "@/globals"

const GroupChat = ({ params }: { params: { id: string } }) => {
  const ws = new WebSocket(
    `${URL_SOCKETS}/wsGroupChat?chatID=${params.id}`
  )

  return (
    <div className={styles.messagePageContainer}>
      <GroupMessagePage id={params.id}  ws={ws} />
      <Info />
    </div>
  )
}

export default GroupChat
