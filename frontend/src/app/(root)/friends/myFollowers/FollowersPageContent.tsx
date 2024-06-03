import InputComponent from "@/components/Input/InputComponent"
import { FollowerCart } from "./FollowerCart"
import styles from "../friends.module.css"
import { useEffect, useState } from "react"
import { getAllFollowers } from "@/actions/follows/getAllFollowers"
import { usePersonStore } from "@/lib/state/userStore"
import { getUserFollowers } from "@/actions/follows/getFollowers"
import { debounce } from "@/components/Input/inputHelpers"
import { followUser } from "@/actions/follows/followUser"
import Loader from "@/components/Loader/Loader"

interface Friend {
  user_id: string
  profilePicture: string
  first_name: string
  last_name: string
  email: string
  birthday: string
  about: string
  canBeFollowed: boolean
}

export function FollowersPageContent() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [iFollowUsers, setIFollowUsers] = useState<Friend[]>([])
  const [usersCanBeFollowed, setUsersCanBeFollowed] = useState<Friend[]>([])
  const [initialFriends, setInitialFriends] = useState<Friend[]>([])
  const userId = usePersonStore((state) => state.userID)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true; // Flag to track component mounting status

    async function fetchData() {
      try {
        const friendsArr = await getUserFollowers(userId);
        const iFollow = await getAllFollowers(userId);

        if (isMounted) { // Check if component is still mounted before updating state
          setIFollowUsers(iFollow);
          setFriends(friendsArr);
          setInitialFriends(friendsArr);

          const notFollowingUsers = friendsArr.filter(
            (friend:any) => !iFollow.some((followed:any) => followed.user_id === friend.user_id)
          );
          setUsersCanBeFollowed(notFollowingUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }

    fetchData();

    // Cleanup function to cancel ongoing tasks
    return () => {
      isMounted = false; // Update flag to indicate component unmounting
      // You can cancel any ongoing tasks here if needed
    };
  }, []); // Dependency array is empty since this effect should only run once on mount


  const handleSearch = debounce((params: string) => {
    if (params) {
      const lowerCaseParams = params.toLowerCase()
      const newArr = friends.filter(
        (friend) =>
          friend.first_name.toLowerCase().includes(lowerCaseParams) ||
          friend.last_name.toLowerCase().includes(lowerCaseParams)
      )
      setFriends(newArr)
    } else {
      setFriends(initialFriends)
    }
  }, 300)

  const followUserHandler = async (id: string) => {
    const isFollowed = await followUser(id)
    if (isFollowed) {
      // After following a user, update the list of users that can be followed
      const updatedUsersCanBeFollowed = usersCanBeFollowed.filter(
        (user) => user.user_id !== id
      )
      setUsersCanBeFollowed(updatedUsersCanBeFollowed)
    }
  }

  if (loading) {
    return <Loader/>
  }


  return (
    <>
      <div className={styles.searchForFriendsBlock}>
        <InputComponent sortHandler={handleSearch} />
        <div className={styles.divider}></div>

        <div className={styles.friendsBlockContainer}>
          {usersCanBeFollowed && ( friends &&
            friends.length > 0 ?
             friends.map((user) => {
              const usersCanBeFollowedBool = usersCanBeFollowed.some(
                (friend) => friend.user_id === user.user_id
              )
              return (
                <FollowerCart
                  key={user.user_id}
                  user_id={user.user_id}
                  profilePicture={user.profilePicture}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  about={user.about}
                  email={user.email}
                  birthday={user.birthday}
                  canBeFollowed={usersCanBeFollowedBool}
                  onFollow={() => followUserHandler(user.user_id)}
                />
              )
            })
            : <div>{`You don't have any followers yet`}</div>  )
           }
        </div>
      </div>
    </>
  )
}
