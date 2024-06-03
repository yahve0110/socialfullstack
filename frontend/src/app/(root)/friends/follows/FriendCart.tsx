import React from "react"
import styles from "./FriendCart.module.css"
import Image from "next/image"
import Link from "next/link"
import { openChat } from "@/actions/privateChat/openChat"
import { navigateToChat } from "../../groups/helpers"

type FriendCartProps = {
  user_id:string
  profilePicture: string
  firstName: string
  lastName: string
  about:string
  email:string
  birthday:string
  unfollowHanlderCallback:(id:string)=>void
}


const FriendCart = ({
  user_id,
  profilePicture,
  firstName,
  lastName,
  unfollowHanlderCallback
}:FriendCartProps) => {


const unfollowHanlder = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault()
  unfollowHanlderCallback(user_id)
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
          <Image src={profilePicture} alt="Avatar" width={60} height={60} />
          <p>
            {firstName} {lastName}
          </p>
        </div>

        <div className={styles.buttonContainer}>
        <button onClick={(e)=>(unfollowHanlder(e))}>Unfollow</button>
          <button onClick={(e)=>{sendMessageHandler(e)}}>Send message</button>
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

export default FriendCart
