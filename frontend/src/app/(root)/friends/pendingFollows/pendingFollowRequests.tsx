"use client"
import { useEffect, useState } from "react"
import styles from "../friends.module.css"
import { getPendingFollowers } from "@/actions/user/getPendingFollowers"
import { usePersonStore } from "@/lib/state/userStore"
import PendingFollowerCart from "./pendingFollowerCart"
import { acceptPendingFollower } from "@/actions/user/acceptPendingFollower"

interface Follower {
  user_id: string;
  profilePicture: string;
  first_name: string;
  last_name: string;
  addPendingFollowerCallback:(userID:string) => void
}

const PendingFollowRequests = () => {
  const [pendingFollowers, setPendingFollowers] = useState<Follower[]>([])

  const userID = usePersonStore((state) => state.userID)

  useEffect(() => {
    async function getPendingFollowRequests() {
      const pendingFollowersData = await getPendingFollowers(userID)
      if (pendingFollowersData) {
        setPendingFollowers(pendingFollowersData)
      }
    }
    getPendingFollowRequests()
  }, [])


const addPendingFollowerCallback = async(userID:string)=>{
const acceptRequest = await acceptPendingFollower(userID)
if(acceptRequest){
  const newFriendArr = pendingFollowers.filter((friend) => friend.user_id!== userID)
  setPendingFollowers(newFriendArr)
}
}

  return (
    <div className={styles.searchForFriendsBlock}>
      {pendingFollowers.length > 0 ?
        pendingFollowers.map((el) => {
          return (
            <PendingFollowerCart
              key={el.user_id}
              user_id={el.user_id}
              profilePicture={el.profilePicture}
              firstName={el.first_name}
              lastName={el.last_name}
              addPendingFollowerCallback={addPendingFollowerCallback}
            />
          )
        }): <div className={styles.noFollowRequests}>{`You don't have any follow requests`}</div>}
    </div>
  )
}

export default PendingFollowRequests
