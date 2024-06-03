import React from "react"
import styles from "./LookForFriends.module.css"
import Image from "next/image"

interface FriendCardProps {
  id: string
  avatar: string
  firstName: string
  lastName: string
  followUserHandler: (id: string) => void
}

const RecommendedFriendCard: React.FC<FriendCardProps> = ({
  id,
  avatar,
  firstName,
  lastName,
  followUserHandler,
}) => {
  return (
    <div className={styles.rFriendCard} id={id}>
      <div className={styles.friendImageDiv}>
        <Image
          src={avatar}
          alt="Avatar"
          width={500}
          height={500}
          className={styles.avatarImg}
        />
        <h3>
          {firstName} {lastName}
        </h3>
      </div>{" "}
      <div className={styles.followDiv}>
        <button onClick={() => followUserHandler(id)}>
          Follow{" "}
          <Image
            src="/assets/icons/addPerson.svg"
            alt="searchIcon"
            width={15}
            height={15}
          />
        </button>
      </div>
    </div>
  )
}

export default RecommendedFriendCard
