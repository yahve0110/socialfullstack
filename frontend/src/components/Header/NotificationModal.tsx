import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Notification, { NotificationType } from "./Notification"
import { getNotifications } from "@/actions/notifications/getNotifications"
import { deleteNotification } from "@/actions/notifications/deleteNotification"
import { navigateTo } from "@/app/(root)/friends/helpers"

const NotificationModal = ({
  setNotificationsModal,
}: {
  setNotificationsModal: (open: boolean) => void
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])

  useEffect(() => {
    async function getData() {
      const data = await getNotifications()
      if (data) {
        setNotifications(data)
      }
    }
    getData()
  }, [])

  console.log("NOTIFICATIONS: ", notifications)

  const handleNotificationClick = (
    notification_id: string,
    notificationLink: string
  ) => {
    deleteNotification(notification_id)
    setNotificationsModal(false)
    navigateTo(notificationLink)
  }
  return (
    <div className={styles.notificationModal}>

      {notifications && notifications.length > 0 ? (
        notifications.map((el) => {
          return (
            <Notification
              key={el.notification_id}
              notification_id={el.notification_id}
              content={el.content}
              type={el.type}
              group_id={el.group_id}
              created_at={el.created_at}
              handleNotificationClick={handleNotificationClick}
            />
          )
        })
      ) : (
        <div>{`You don't have any new notifications`}</div>
      )}
    </div>
  )
}

export default NotificationModal
