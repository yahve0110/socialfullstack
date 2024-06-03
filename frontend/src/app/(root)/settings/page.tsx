"use client"
import { changeUserPrivacy } from "@/actions/user/updatePrivacy"
import { usePersonStore } from "@/lib/state/userStore"
import { useState, useEffect } from "react"
import styles from "./settings.module.css"

const Settings = () => {
  const [privacy, setPrivacy] = useState("")

  const privacyFromStore = usePersonStore((state) => state.privacy)
  const updatePrivacy = usePersonStore((state) => state.updatePrivacy)

  useEffect(() => {
    setPrivacy(privacyFromStore)
  }, [privacyFromStore])

  const handleChangePrivacy = async () => {
    const newPrivacy = await changeUserPrivacy(privacy)
    setPrivacy(newPrivacy)
    updatePrivacy(newPrivacy)
  }

  return (
    <div className={styles.settingsContainer}>
      Your profile is: {privacy}
      <button className={styles.btnPrivacy} onClick={handleChangePrivacy}>
        Change
      </button>
    </div>
  )
}

export default Settings
