"use client"
import { useEffect, useState } from "react"
import styles from "./News.module.css"
import Info from "@/components/Info/Info"
import { getUserFeed } from "@/actions/news/getFeed"
import ProfilePostHOC from "@/components/Post/ProfilePostHOC"
import GroupPostHOC from "@/components/Post/GroupPostHOC"
import GroupEvent, {
  eventOptionsType,
} from "../groups/[id]/GroupEvent/GroupEvent"

type Post = {
  type: "post"
  id: string
  content: string
  createdAt: string
  firstName: string
  lastName: string
  image: string
  likesCount: number
  author_id: string
}

type GroupPost = {
  type: "groupPost"
  id: string
  content: string
  createdAt: string
  author_first_name: string
  author_last_name: string
  image: string
  likesCount: number
  authorId: string
}

type GroupEvent = {
  type: "event"
  id: string
  title: string
  description: string
  createdAt: string
  eventImg: string
  options: eventOptionsType
}

export default function News() {
  const [feed, setFeed] = useState<(Post | GroupPost | GroupEvent)[]>([])

  useEffect(() => {
    async function getFeed() {
      try {
        const feedData = await getUserFeed()
        setFeed(feedData)
      } catch (error) {
        console.error("Error fetching feed:", error)
      }
    }
    getFeed()
  }, [])
  return (
    <div className={`sectionComponent ${styles.newsContainer}`}>
      <div className={styles.newsPostsContainer}>
        {feed &&
          feed.map((el) => {
            if (el.type === "post") {
              const post = el as Post
              return (
                <ProfilePostHOC
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  creationTime={post.createdAt}
                  authorFirstname={post.firstName}
                  authorLastname={post.lastName}
                  image={post.image}
                  likes={post.likesCount}
                  author_id={post.author_id}
                />
              )
            } else if (el.type === "groupPost") {
              const groupPost = el as GroupPost
              return (
                <GroupPostHOC
                  key={groupPost.id}
                  id={groupPost.id}
                  content={groupPost.content}
                  creationTime={groupPost.createdAt}
                  authorFirstname={groupPost.author_first_name}
                  authorLastname={groupPost.author_last_name}
                  group_post_img={groupPost.image}
                  likes={groupPost.likesCount}
                  author_id={groupPost.authorId}
                  //fix later
                  groupId={groupPost.authorId}
                />
              )
            } else {
              const event = el as GroupEvent
              return (
                <GroupEvent
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  content={event.description}
                  creationTime={event.createdAt}
                  eventImg={event.eventImg}
                  eventOptions={event.options}
                />
              )
            }
          })}
      </div>
      <Info />
    </div>
  )
}
