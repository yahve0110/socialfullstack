import { deleteUserPost } from "@/actions/post/deletePost"

import { togglePostLike } from "@/actions/post/toggleLike"
import { useProfilePostStore } from "@/lib/state/profilePostStore"
import { removePostHandler } from "@/app/(root)/profile/helper"
import PostUi from "./PostUi"

export type PostType = {
  id: string
  content: string
  creationTime: string
  authorFirstname: string
  authorLastname: string
  image: string
  likes: number
  author_id: string
  handleDeletePost?: () => void
  addPostLikeHandler?: () => void
  private_users?: string[]
}

export default function ProfilePostHOC(props: PostType) {
  const {
    id,
    content,
    creationTime,
    authorFirstname,
    authorLastname,
    image,
    likes,
    author_id,
  } = props

  const handleDeletePost = async () => {
    const removed = await deleteUserPost(id)
    if (removed) {
      removePostHandler(id)
    }
  }

  const addPostLikeHandler = async () => {
    const data = await togglePostLike(id)
    if (data) {
      useProfilePostStore.getState().changeLikesCount(id, data.likes_count)
    }
  }

  return (
    <PostUi
      id={id}
      content={content}
      creationTime={creationTime}
      authorFirstname={authorFirstname}
      authorLastname={authorLastname}
      image={image}
      likes={likes}
      author_id={author_id}
      handleDeletePost={handleDeletePost}
      addPostLikeHandler={addPostLikeHandler}
    />
  )
}
