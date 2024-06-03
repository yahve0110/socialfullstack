"use client"
import { Header, Socket } from "@/components/Header/Header"
import Navbar from "@/components/Navbar/Navbar"
import Image from "next/image"
import React, { useCallback, useEffect } from "react"
import styles from "./styles.module.css"
import Providers from "@/app/providers"
import { getStaticProps } from "@/actions/user/getUserInfo"
import { usePersonStore } from "@/lib/state/userStore"


type User = {
  user_id: string
  about: string
  birth_date: string
  email: string
  first_name: string
  last_name: string
  gender: string
  profilePicture: string
  username: string
  privacy: string
}

export function sendNotificationWs(
  receiver_id: string,
  senderId: string,
  message: string,
  type: string
) {
  const notification = {
    user_id: receiver_id,
    sender_id: senderId,
    message: message,
    type: type,
  }
  Socket.send(JSON.stringify(notification))
}

const Lauout = ({ children }: { children: React.ReactNode }) => {
  const updateUserID = usePersonStore((state) => state.updateUserID)
  const updateFirstName = usePersonStore((state) => state.updateFirstName)
  const updateLastName = usePersonStore((state) => state.updateLastName)
  const updateAbout = usePersonStore((state) => state.updateAbout)
  const updateBirthDate = usePersonStore((state) => state.updateBirthDate)
  const updateAvatar = usePersonStore((state) => state.updateAvatar)
  const updateEmail = usePersonStore((state) => state.updateEmail)
  const updateUsername = usePersonStore((state) => state.updateUsername)
  const updatePrivacy = usePersonStore((state) => state.updatePrivacy)

  const updateUserData = useCallback(
    (userData: User) => {
      updateUserID(userData.user_id)
      updateFirstName(userData.first_name)
      updateLastName(userData.last_name)
      updateAbout(userData.about)
      updateBirthDate(userData.birth_date)
      updateAvatar(userData.profilePicture)
      updateEmail(userData.email)
      updateUsername(userData.username)
      updatePrivacy(userData.privacy)
    },
    [
      updateUserID,
      updateFirstName,
      updateLastName,
      updateAbout,
      updateBirthDate,
      updateAvatar,
      updateEmail,
      updateUsername,
      updatePrivacy,
    ]
  )

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userData = await getStaticProps();
        updateUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Providers>
      <Header />
      <section className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Image
            className={styles.polygonImg}
            src="/assets/imgs/back.svg"
            alt="back"
            fill={true}
          />
          {children}
        </div>
      </section>
    </Providers>
  )
}

export default Lauout
