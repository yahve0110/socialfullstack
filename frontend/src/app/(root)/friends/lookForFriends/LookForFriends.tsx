

import InputComponent from "@/components/Input/InputComponent"
import styles from "./LookForFriends.module.css"
import RecomendedFriendCart from "./RecomendedFriendCart"
import { useEffect, useState } from "react"
import { getAllUsers } from "@/actions/follows/getAllUsers"
import { usePersonStore } from "@/lib/state/userStore"
import { followUser } from "@/actions/follows/followUser"
import { debounce } from "@/components/Input/inputHelpers"
import { sendNotification } from "@/actions/notifications/sendNotification"
import { sendNotificationWs } from "../../layout"

interface User {
  user_id: string
  profilePicture: string
  first_name: string
  last_name: string
}

export default function LookForFriends() {
  const [usersArr, setUsersArr] = useState<User[]>([])
  const [initialUsersArr, setInitialUsersArr] = useState<User[]>([])

  const userId = usePersonStore((state) => state.userID)

  useEffect(() => {
    async function getPossibleFriends() {
      try {
        const usersArr = await getAllUsers()
        console.log(usersArr)
        const filteredUsers = usersArr.filter(
          (user: User) => user.user_id !== userId
        )
        setInitialUsersArr(filteredUsers)
        setUsersArr(filteredUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    getPossibleFriends()
  }, [userId])

  const followUserHandler = async (id: string) => {
    const isFollowed = await followUser(id)
    sendNotification(id, "friends_request", "New follow request", "")
    sendNotificationWs(id,userId,"New follow request!", "follow")
    if (isFollowed) {
      const newUserArr = usersArr.filter((user) => user.user_id !== id)
      setUsersArr(newUserArr)
    }
  }

  const handleSearch = debounce((params: string) => {
    if (params) {
      const lowerCaseParams = params.toLowerCase()
      const newArr = usersArr.filter(
        (user) =>
          user.first_name.toLowerCase().includes(lowerCaseParams) ||
          user.last_name.toLowerCase().includes(lowerCaseParams)
      )
      setUsersArr(newArr)
    } else {
      setUsersArr(initialUsersArr)
    }
  }, 300)

  return (
    <div className={styles.lookFriendsContainer}>
      <div>
        <InputComponent sortHandler={handleSearch} />
        <div className={styles.divider}></div>
      </div>
      <div className={styles.recommededFriendsDiv}>
        {usersArr.length > 0 ? (
          usersArr.map((user) => {
            return (
              <RecomendedFriendCart
                key={user.user_id}
                id={user.user_id}
                avatar={user.profilePicture}
                firstName={user.first_name}
                lastName={user.last_name}
                followUserHandler={followUserHandler}
              />
            )
          })
        ) : (
          <div className={styles.NothingFound}>Nothing found</div>
        )}
      </div>
    </div>
  )
}
