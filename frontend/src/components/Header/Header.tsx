"use client"

import React, { useEffect, useRef, useState } from "react"
import ThemeSwitch from "@/components/ThemeSwitcher"
import styles from "./Header.module.css"
import Image from "next/image"
import { logoutHandler } from "@/actions/auth/logout"
import { useRouter } from "next/navigation"
import { usePersonStore } from "@/lib/state/userStore"
import Link from "next/link"
import NotificationModal from "./NotificationModal"
import NotificationPopUp from "./NotificationPopUp"

interface Notification {
  id: string
  content: string
}

export let Socket: WebSocket

export const Header: React.FC = () => {
  const { push } = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const [notificationsModal, setNotificationsModal] = useState(false)
  const avatarImg = usePersonStore((state) => state.avatar)
  const [popupNotifications, setPopupNotifications] = useState<Notification[]>(
    []
  )
  const [notificationCount, setNotificationCount] = useState(0)
  const userId = usePersonStore((state) => state.userID)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const notificationModal = document.querySelector(".notification-modal")
      if (
        notificationsModal &&
        notificationModal &&
        !notificationModal.contains(event.target as Node)
      ) {
        setNotificationsModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notificationsModal])

  const logUserOut = async () => {
    const res = await logoutHandler()
    if (res) {
      push("/")
    }
  }

  useEffect(() => {
    Socket = new WebSocket(
      `ws://localhost:8080/Wsnotifications?userId=${userId}`
    )
    Socket.addEventListener("open", function () {
      console.log("Websocket connected.")
    })

    Socket.addEventListener("message", function (event: MessageEvent) {
      const message = JSON.parse(event.data)
      console.log("Received message:", message)
    })

    Socket.addEventListener("close", function (event: CloseEvent) {
      console.log("Socket closed:", event.reason)
    })

    Socket.addEventListener("error", function (error: Event) {
      console.error("Socket error:", error)
    })
    if (Socket) {
      const handleSocketMessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data)
        console.log("WS MESSAGE:", message)
        setNotificationCount((prevCount) => prevCount + 1)
        handleAddToast(message.text)
      }

      Socket.addEventListener("message", handleSocketMessage)

      return () => {
        Socket.removeEventListener("message", handleSocketMessage)
      }
    }
  }, [Socket])

  const handleAddToast = (text: string) => {
    const notification = {
      id: Date.now().toString(),
      content: text,
    }

    setPopupNotifications([notification, ...popupNotifications])

    setTimeout(() => {
      setPopupNotifications((prevNotifications) =>
        prevNotifications.filter((item) => item.id !== notification.id)
      )
    }, 5000)
  }

  const handleNotificationModal = () => {
    setModalOpen(false)
    setNotificationCount(0)
    setNotificationsModal(!notificationsModal)
  }

  const handleInfoToggle = () => {
    setModalOpen(!modalOpen)
    setNotificationsModal(false)
  }

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <div className={styles.logoBlock}>
          <Image
            width={30}
            height={30}
            src="/assets/imgs/logo.png"
            className={styles.logo}
            alt="logo"
          />
          <h1>Kood/Network</h1>
        </div>
        <div className={styles.HeaderInputDiv}></div>
        <div className={styles.UserInfoBlock}>
          <Image
            className={styles.notificationBell}
            width={50}
            height={50}
            src="/assets/icons/notifibell.svg"
            alt="notification"
            onClick={handleNotificationModal}
          />
          {notificationCount > 0 && (
            <div className={styles.notificationCount}>{notificationCount}</div>
          )}

          {notificationsModal && (
            <NotificationModal setNotificationsModal={setNotificationsModal} />
          )}
          <div className={styles.UserProfileBlock} onClick={handleInfoToggle}>
            <Image
              className={styles.userAvatar}
              src={avatarImg}
              alt="avatar"
              width={100}
              height={100}
            />
            {modalOpen && (
              <div className={styles.modal} ref={modalRef}>
                <Link href={"/profile"} className={styles.logoutBtn}>
                  My profile
                </Link>
                <button className={styles.logoutBtn} onClick={logUserOut}>
                  Logout{" "}
                  <Image
                    className={styles.logoutImg}
                    src={"/assets/icons/logout.svg"}
                    alt="logout"
                    width={15}
                    height={15}
                  />
                </button>
              </div>
            )}
            <Image
              className={
                modalOpen
                  ? `${styles.arrow} ${styles.arrowReverse}`
                  : styles.arrow
              }
              src="/assets/icons/arrow.svg"
              alt="arrow"
              width={15}
              height={15}
            />
          </div>
          <ThemeSwitch />
        </div>
      </div>
      <div id="popUpContainer" className={styles.popUpContainer}></div>
      <div className={styles.notificationContainer}>
        {popupNotifications &&
          popupNotifications.length > 0 &&
          popupNotifications.map((el) => {
            return <NotificationPopUp key={el.id} content={el.content} />
          })}
      </div>
    </div>
  )
}
