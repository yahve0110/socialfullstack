"use client"
import React, { useEffect, useState } from "react"
import ProfileInfo from "./profileInfo/ProfileInfoHOC"
import styles from "./profile.module.css"
import FollowersBlock from "./profileInfo/FollowersBlock"
import GroupsBlock from "./profileInfo/GroupsBlock"
import CreatePost from "@/components/CreatePost/CreatePost"
import { getPostsForProfile } from "@/actions/post/getPosts"
import { getUserFollowers } from "@/actions/follows/getFollowers"
import { useProfilePostStore } from "@/lib/state/profilePostStore"
import { getAllFollowers } from "@/actions/follows/getAllFollowers"
import ProfilePostHOC from "@/components/Post/ProfilePostHOC"
import Loader from "@/components/Loader/Loader"
import { usePersonStore } from "@/lib/state/userStore"

export default function Profile() {
  const setPosts = useProfilePostStore((state) => state.setPostsArray)
  const posts = useProfilePostStore((state) => state.postsArray)
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(true)
  const [iFollow, setIfollow] = useState([])

  const userId = usePersonStore((state) => state.userID)

  useEffect(() => {
    let isFinished = false
    async function fetchPageData() {
      try {
        // Fetch posts for the profile
        const fetchedPosts = await getPostsForProfile(userId)

        // Fetch user followers
        const fetchedFollowers = await getUserFollowers(userId)
        const fetchedIFollow = await getAllFollowers(userId)

        if (!isFinished) {
          setPosts(fetchedPosts)
          setFollowers(fetchedFollowers)
          setIfollow(fetchedIFollow)
          // Set loading to false once data is fetched
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    if (userId) {
      fetchPageData()
    }
  }, [userId])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={`sectionComponent ${styles.profile}`}>
      <>
        <ProfileInfo />

        <div className={styles.profileContentContainer}>
          <div className={styles.additionalContainer}>
            {/* Display followers block */}
            <FollowersBlock followers={followers} iFollow={iFollow} />
            {/* Display groups block */}
            <GroupsBlock />
          </div>
          <div className={styles.postsContainer}>
            {/* Create new post */}
            <CreatePost
              placeholder="What's on your mind?"
              followers={followers}
            />

            {/* Display posts */}
            {posts &&
              posts.map((post) => (
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
              ))}
            {/* Empty div for styling */}
            <div className={styles.emptyDiv}></div>
          </div>
        </div>
      </>
    </div>
  )
}
