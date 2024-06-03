import Image from "next/image"
import React from "react"
import styles from "./pendingStyles.module.css"
import Link from "next/link"

type PendingFollowerCartType = {
    user_id:string
    profilePicture: string
    firstName: string
    lastName:string
    addPendingFollowerCallback:(userID:string)=>void
}

const PendingFollowerCart = ({ user_id,profilePicture,firstName,lastName,addPendingFollowerCallback}:PendingFollowerCartType) => {

    const addPendingFollowerHandler = (e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault()
        addPendingFollowerCallback(user_id)
    }

  return (
    <Link href={`/profile/${user_id}`} className={styles.followerDiv} id={user_id}>
      <div>
        <Image
          src={profilePicture}
          alt="avatar"
          width={500}
          height={500}
        />
        <p>{firstName} {lastName}</p>
      </div>
      <button onClick={(e)=>(addPendingFollowerHandler(e))}>
        Accept{" "}
        <Image
          src={"/assets/icons/ok.svg"}
          alt="avatar"
          width={20}
          height={20}
        />
      </button>
    </Link>
  )
}

export default PendingFollowerCart
