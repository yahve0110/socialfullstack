import React from "react"
import styles from "./Header.module.css"
import Image from "next/image"

const NotificationPopUp = ({content}:{content:string}) => {
  return (
    <div className={styles.popUpDiv}>
      {/* <Image
        className={styles.closeModal}
        src={"/assets/icons/delete.svg"}
        width={20}
        height={20}
        alt="delete"
      /> */}
      <div>{content}</div>
    </div>
  )
}

export default NotificationPopUp
