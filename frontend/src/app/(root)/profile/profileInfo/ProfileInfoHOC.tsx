"use client"

import { usePersonStore } from "@/lib/state/userStore"
import ProfileInfoUI from "./ProfileInfoUI"

export default function ProfileInfo() {

  //<----------------------GET DATA FROM STORE ----------------------->
  const firstName = usePersonStore((state) => state.firstName)
  const lastName = usePersonStore((state) => state.lastName)
  const about = usePersonStore((state) => state.about)
  const birthady = usePersonStore((state) => state.birth_date)
  const email = usePersonStore((state) => state.email)
  const avatarImg = usePersonStore((state) => state.avatar)
  const username = usePersonStore((state) => state.username)

  //<----------------------CONVET DATE INTO READABLE ----------------------->

  const date = new Date(birthady)
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  const birthDayReadable = `${day < 10 ? "0" : ""}${day}.${
    month < 10 ? "0" : ""
  }${month}.${year}`

  return (
    <ProfileInfoUI
      firstName={firstName}
      lastName={lastName}
      about={about}
      birthday={birthDayReadable}
      email={email}
      avatarImg={avatarImg}
      username={username}
    />
  )
}
