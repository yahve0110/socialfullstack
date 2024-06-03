import React from "react"
import styles from "./FollowerCart.module.css"
import Image from "next/image"
import Link from "next/link"
import { openChat } from "@/actions/privateChat/openChat"
import { navigateToChat } from "../../groups/helpers"

type FriendCartProps = {
  user_id: string
  profilePicture: string
  firstName: string
  lastName: string
  about: string
  email: string
  birthday: string
  canBeFollowed: boolean
  onFollow: (userId: string) => void
}

export const FollowerCart = ({
  user_id,
  profilePicture,
  firstName,
  lastName,
  canBeFollowed,
  onFollow,
}: FriendCartProps) => {
  const followHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onFollow(user_id)
  }

  const sendMessageHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const resp = await openChat(user_id)
    if (resp) {
      navigateToChat(resp.chat_id)
    }
  }

  return (
    <Link href={`/profile/${user_id}`}>
      <div className={styles.cartDiv}>
        <div className={styles.imageDiv}>
          <Image src={profilePicture} alt="Avatar" width={100} height={100} />
          <p>
            {firstName} {lastName}
          </p>
        </div>

        <div className={styles.buttonContainer}>
          {canBeFollowed && (
            <button onClick={(e) => followHandler(e)}>Follow back</button>
          )}
          <button
            className={styles.sendMsg}
            onClick={(e) => {
              sendMessageHandler(e)
            }}
          >
            Send message
          </button>

          <Image
            src="/assets/imgs/plane.png"
            alt="searchIcon"
            width={15}
            height={15}
          />
        </div>
      </div>
    </Link>
  )
}
