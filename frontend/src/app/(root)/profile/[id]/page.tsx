"use client"

import styles from "../profile.module.css"
import FollowersBlock from "../profileInfo/FollowersBlock"
import GroupsBlock from "../profileInfo/GroupsBlock"
import { getPostsForProfile } from "@/actions/post/getPosts"
import { useEffect, useState } from "react"
import { useProfilePostStore } from "@/lib/state/profilePostStore"
import { getUserFollowers } from "@/actions/follows/getFollowers"
import ProfileInfoUI from "../profileInfo/ProfileInfoUI"
import { getUserInfoById } from "@/actions/user/getUserInfoById"
import { usePersonStore } from "@/lib/state/userStore"
import { getAllFollowers } from "@/actions/follows/getAllFollowers"
import ProfilePostHOC from "@/components/Post/ProfilePostHOC"
import Loader from "@/components/Loader/Loader"

export interface UserInfo {
  first_name: string
  last_name: string
  about: string
  birthday: string
  email: string
  profilePicture: string
  username: string
  privacy: string

}

interface ProfileProps {
  params: { id: string }
}

export default function Profile({ params }: ProfileProps) {
  const setPosts = useProfilePostStore((state) => state.setPostsArray)
  const [followers, setFollowers] = useState<{ user_id: string }[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [iFollow, setIfollow] = useState([])

  useEffect(() => {
    async function fetchPageData() {
      try {
        setLoading(true)

        const userId = params.id
        setPosts([])

        const userData = await getUserInfoById(userId)
        setUserInfo(userData)

        const posts = await getPostsForProfile(userId)
        if (posts) {
          setPosts(posts)
        }

        const iFollow = await getAllFollowers(userId)
        setIfollow(iFollow)
        const fetchedFollowers = await getUserFollowers(userId)
        setFollowers(fetchedFollowers)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPageData()
  }, [params.id, setPosts])

  const posts = useProfilePostStore((state) => state.postsArray)
  const currentUserId = usePersonStore((state) => state.userID) as string
  const profileAccess = followers?.some(
    (follower) => follower.user_id === currentUserId
  )

  if (loading) return <Loader/>
  if (error) return <div>Error: {error.message}</div>


  return (
    <div className={`sectionComponent ${styles.profile}`}>
      {userInfo && (userInfo.privacy === "public" || profileAccess) ? (
        <>
          <ProfileInfoUI
            firstName={userInfo.first_name}
            lastName={userInfo.last_name}
            about={userInfo.about}
            birthday={userInfo.birthday}
            email={userInfo.email}
            avatarImg={userInfo.profilePicture}
            username={userInfo.username}
          />

          <div className={styles.profileContentContainer}>
            <div className={styles.additionalContainer}>
              <FollowersBlock followers={followers} iFollow={iFollow} />
              <GroupsBlock />
            </div>
            <div className={styles.postsContainer}>
              {posts.map((post) => {
                if (post.privacy === "public") {
                  return (
                    <ProfilePostHOC
                      key={post.post_id}
                      id={post.post_id}
                      content={post.content}
                      creationTime={post.created_at}
                      authorFirstname={post.author_first_name}
                      authorLastname={post.author_last_name}
                      image={post.image}
                      likes={post.likes_count}
                      author_id={post.author_id}
                    />
                  )
                } else if (post.privacy === "private") {
                  if (
                    followers &&
                    followers.length > 0 &&
                    followers.map((el) => el.user_id).includes(currentUserId)
                  ) {
                    return (
                      <ProfilePostHOC
                        key={post.post_id}
                        id={post.post_id}
                        content={post.content}
                        creationTime={post.created_at}
                        authorFirstname={post.author_first_name}
                        authorLastname={post.author_last_name}
                        image={post.image}
                        likes={post.likes_count}
                        author_id={post.author_id}
                      />
                    )
                  }
                } else if (post.privacy === "almost private") {
                  if (
                    followers &&
                    followers.length > 0 &&
                    post.private_users &&
                    post.private_users.includes(currentUserId) &&
                    followers.map((el) => el.user_id).includes(currentUserId)
                  ) {
                    return (
                      <ProfilePostHOC
                        key={post.post_id}
                        id={post.post_id}
                        content={post.content}
                        creationTime={post.created_at}
                        authorFirstname={post.author_first_name}
                        authorLastname={post.author_last_name}
                        image={post.image}
                        likes={post.likes_count}
                        author_id={post.author_id}
                      />
                    )
                  }
                }
              })}
              <div className={styles.emptyDiv}></div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.privateDiv}>
          <div>This profile is private!</div>
          <div>
            To access information, you have to be an accepted follower first.
          </div>
        </div>
      )}
    </div>
  )
}
