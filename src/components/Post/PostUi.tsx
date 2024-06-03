"use client"
import { useState } from "react"
import styles from "./Post.module.css"
import { usePersonStore } from "@/lib/state/userStore"
import Image from "next/image"
import { ShowPostCommentBlock } from "./CommentsBLock"
import { PostType } from "./ProfilePostHOC"
import { formatDateWithoutSeconds } from "@/helpers/convertTime"


const PostUi = (props: PostType) => {
  const {
    id,
    content,
    creationTime,
    authorFirstname,
    authorLastname,
    image,
    likes,
    author_id,
    handleDeletePost,
    addPostLikeHandler
  } = props
  const currentUserId = usePersonStore((state) => state.userID)
  const [showComments, setShowComments] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  var formattedDate = formatDateWithoutSeconds(creationTime)

  return (
    <div className={styles.post} id={id}>
      <div className={styles.postAuthor}>
        <div className={styles.postNameAuthor}>
          <p>
            {authorFirstname} {authorLastname}
          </p>
        </div>
        {author_id === currentUserId && (
          <div
            className={styles.postMore}
            onClick={() => setOpenModal(!openModal)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      {openModal && (
        <div className={styles.postModal}>
          <div className={styles.modalItem} onClick={handleDeletePost}>
            Delete{" "}
            <Image
              src={"/assets/icons/delete.svg"}
              alt="delete"
              width={15}
              height={15}
            />
          </div>
        </div>
      )}

      <div className={styles.divider}></div>

      <div className={styles.postText}>{content}</div>
      {image && (
        <div className={styles.postImageDiv}>
          <Image
            className={styles.postImg}
            src={image}
            alt="postImg"
            width={500}
            height={500}
          />
        </div>
      )}

      <div className={styles.timeDiv}> {formattedDate}</div>

      <div className={styles.commentUnder}>
        <div onClick={addPostLikeHandler}>
          {likes}{" "}
          <Image
            className={styles.likeImg}
            src="/assets/icons/like.svg"
            alt="like"
            width={25}
            height={25}
          />
        </div>
        <div>
          <Image
            className={styles.commentImg}
            src="/assets/icons/comment.svg"
            alt="like"
            width={25}
            height={25}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
      </div>
      {showComments && <ShowPostCommentBlock postId={id} />}
    </div>
  )
}

export default PostUi
