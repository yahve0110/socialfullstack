import { removePostHandler } from "@/app/(root)/profile/helper"
import PostUi from "./PostUi"
import { toggleGroupPostLike } from "@/actions/groups/toggleGroupPostLike"
import { useGroupFeedStore } from "@/lib/state/groupFeedSore"
import { deleteGroupPost } from "@/actions/groups/deleteGroupPost"

export type PostType = {
  id: string
  content: string
  creationTime: string
  authorFirstname: string
  authorLastname: string
  group_post_img: string
  likes: number
  author_id: string
  handleDeletePost?: () => void
  addPostLikeHandler?: () => void
  private_users?: string[]
  groupId: string
}

export default function GroupPostHOC(props: PostType) {
  const {
    id,
    content,
    creationTime,
    authorFirstname,
    authorLastname,
    group_post_img,
    likes,
    author_id,
    groupId,
  } = props

  const handleDeleteGroupPost = async () => {
    const removed = await deleteGroupPost(groupId, id)
    if (removed) {
      useGroupFeedStore.getState().removePost(id)

    }
  }

  const addGroupPostLikeHandler = async () => {
    const data = await toggleGroupPostLike(groupId, id)
    if (data) {
      useGroupFeedStore.getState().changeLikesCount(id, data.likesCount)
    }
  }

  return (
    <PostUi
      id={id}
      content={content}
      creationTime={creationTime}
      authorFirstname={authorFirstname}
      authorLastname={authorLastname}
      image={group_post_img}
      likes={likes}
      author_id={author_id}
      handleDeletePost={handleDeleteGroupPost}
      addPostLikeHandler={addGroupPostLikeHandler}
    />
  )
}
