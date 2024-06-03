import { usePersonStore } from "@/lib/state/userStore"
import styles from "./MessagePage.module.css"

export type MessageType = {
  chatId: string
  content: string
  first_name: string
  last_name: string
  timestamp: string
  profile_picture: string
  message_author_id:string
}

export default function Message({
  chatId,
  content,
  first_name,
  last_name,
  profile_picture,
  timestamp,
  message_author_id
}: MessageType) {
  const formattedTimestamp = new Date(timestamp).toLocaleString("eu-EU", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, 
  })


  const currentUserId = usePersonStore((state) => state.userID)


  return (
    <div className={currentUserId === message_author_id ? styles.msgReverse : styles.message}>
      <div className={styles.messageLeftPart}>
        <div className={styles.messageName}>
          <p>{first_name}</p>
        </div>
        <div className={styles.messageText}>{content}</div>
      </div>
      <div className={styles.msgTime}>{formattedTimestamp}</div>
    </div>
  )
}
