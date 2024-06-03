"use client"
import { CommentType } from "@/models"
import styles from "./Comment.module.css"
import Image from "next/image"
import { formatDateWithoutSeconds } from "@/helpers/convertTime"
import { useState } from "react"

import { toggleCommentLike } from "@/actions/post/toggleCommentLike"

export default function Comment(props: CommentType) {
  const {
    comment_id,
    content,
    author_first_name,
    author_last_name,
    image,
    comment_created_at,
    author_avatar,
    handleDeleteComment,
    likes_count,
  } = props

  const [modalOpen, setModalOpen] = useState(false)
  const [likesCount, setLikesCount] = useState( likes_count)

  const readableDate = formatDateWithoutSeconds(  comment_created_at)

  const handleToggleLike = async () => {
    const toggleLike = await toggleCommentLike( comment_id)
    if (toggleLike) {
      setLikesCount(toggleLike.likes_count)
    }
  }
    return (
      <div className={styles.commentContainer} id={ comment_id}>
        <div className={styles.commentUpper}>
          <div className={styles.commetnAuthorContainer}>
            <Image
              className={styles.commentAvatar}
              src={ author_avatar}
              alt="avatar"
              width={30}
              height={30}
            />
            <h4>
              { author_first_name} { author_last_name}
            </h4>
          </div>
          <div
            className={styles.postMore}
            onClick={() => setModalOpen(!modalOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {modalOpen && (
          <div className={styles.commentModal}>
            <div
              className={styles.modalItem}
              onClick={() => handleDeleteComment(comment_id)}
            >
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
        <p>{content}</p>
        {image && (
          <Image
            className={styles.commentImg}
            src={image}
            alt="avatar"
            width={450}
            height={200}
          />
        )}
        <div className={styles.commentDownDiv}>
          <div className={styles.likesDiv}>
            {likesCount}
            <Image
              src="/assets/icons/like.svg"
              alt="avatar"
              width={20}
              height={20}
              onClick={handleToggleLike}
            />
          </div>
          {readableDate}
        </div>
      </div>
    )
  }

