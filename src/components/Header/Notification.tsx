import React, { useState } from "react"
import styles from "./Header.module.css"
import Image from "next/image"
import { deleteNotification } from "@/actions/notifications/deleteNotification"

export type NotificationType = {
  notification_id: string
  content: string
  type: string
  group_id: string
  created_at: string
  handleNotificationClick: (
    notification_id: string,
    notificationLink: string
  ) => void
}

const Notification = ({
  notification_id,
  content,
  group_id,
  type,
  created_at,
  handleNotificationClick,
}: NotificationType) => {
  const deleteNotificationHandler = async () => {
    const deleted = deleteNotification(notification_id)
  }

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  let notificationLink = ""

  switch (type) {
    case "friends_request": {
      notificationLink = "/friends"
      break
    }
    case "group_invite": {
      notificationLink = "/groups"
      break
    }
    case "group_request": {
      notificationLink = `/groups/${group_id}`
      break
    }
    case "group_event": {
      notificationLink = `/groups/${group_id}`
      break
    }
    default:
      notificationLink = "/"
  }

  return (
    <>
      {
        <div
          id={notification_id}
          className={styles.notificationDiv}
          onClick={() =>
            handleNotificationClick(notification_id, notificationLink)
          }
        >
          {content}
          <div>
            <Image
              onClick={deleteNotificationHandler}
              className={styles.closeNotification}
              src={"/assets/icons/attention.svg"}
              width={20}
              height={20}
              alt="delete"
            />
          </div>
          {formatCreatedAt(created_at)}
        </div>
      }
    </>
  )
}

export default Notification
