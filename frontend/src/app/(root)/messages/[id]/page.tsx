"use client"

import Info from "@/components/Info/Info"
import MessagePage from "./MessagePage"
import styles from "./MessagePage.module.css"
import { usePersonStore } from "@/lib/state/userStore"
import { URL_SOCKETS } from "@/globals"

const MessageId = ({ params }: { params: { id: string } }) => {
  const userId = usePersonStore((state) => state.userID)

  const ws = new WebSocket(
    `${URL_SOCKETS}/ws?userID=${userId}&chatID=${params.id}`
  )

  return (
    <div className={styles.messagePageContainer}>
      <MessagePage id={params.id} ws={ws} />
      <Info />
    </div>
  )
}

export default MessageId
