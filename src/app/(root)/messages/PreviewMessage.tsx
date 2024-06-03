import styles from "./Messages.module.css"
import Image from "next/image"
import Link from "next/link"

export type PreviewMessageType = {
  chat_id: string
  first_name: string
  last_name: string
  profile_picture: string
  last_message: string
  last_message_time: string
}

export default function PreviewMessage({
  chat_id,
  first_name,
  last_name,
  profile_picture,
  last_message,
  last_message_time,
}: PreviewMessageType) {
  last_message = last_message.slice(0, 6) + "..."

  const formattedTimestamp = new Date(last_message_time).toLocaleString(
    "eu-EU",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: false, 
    }
  )

  return (
    <Link href={`messages/${chat_id}`} className={styles.messageDiv}>
      <div className={styles.messageLeftPart}>
        <Image className={styles.previewAvatar} src={profile_picture} alt="avatar" width={50} height={50} />
        <div className={styles.messageName}>
          <p>
            {first_name} {last_name}
          </p>
          <div className={styles.message}>{last_message}</div>
        </div>

      </div>
      <div>
        <div className={styles.msgTime}>{last_message_time ? formattedTimestamp : ""}</div>
      </div>
    </Link>
  )
}
