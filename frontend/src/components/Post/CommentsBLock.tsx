import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "./Post.module.css"
import Comment from "../Comment/Comment"
import { usePersonStore } from "@/lib/state/userStore"
import { MAX_FILE_SIZE_MB } from "@/globals"
import { handleFileChange } from "@/helpers/imageUpload"
import { createComment } from "@/actions/post/createComment"
import { getComments } from "@/actions/post/getCommentsForPost"
import { useCommentsStore } from "@/lib/state/commentsStore"
import { deleteComment } from "@/actions/post/deleteComment"

export function ShowPostCommentBlock({ postId }: { postId: string }) {
  //<----------------------STATE----------------------->

  const [addCommentActive, setAddCommentActive] = useState(false)
  const [emptyTextError, setEmptyTextError] = useState("")
  const [commentText, setCommentText] = useState("")
  const [commentImg, setCommentImg] = useState<string | ArrayBuffer | null>(
    null
  )

  const avatarImg = usePersonStore((state) => state.avatar)

  function activateInput() {
    const input = document.getElementById("input")
    input?.click()
  }

  const { setCommentsArray } = useCommentsStore()
  const { commentsArray } = useCommentsStore()

  useEffect(() => {
    async function getCommentsHandler() {
      const commentsArr = await getComments(postId)
      setCommentsArray(commentsArr)
    }

    getCommentsHandler()
  }, [])

  //<----------------------HANDLERS----------------------->
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmptyTextError("")
    const file = event.target.files?.[0]
    if (!file) {
      setEmptyTextError(`Can't upload file`)
    }
    if (file instanceof File) {
      const response = await handleFileChange(file)
      if (!response) {
        setEmptyTextError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`)
      } else {
        setCommentImg(response)
      }
    }
  }

  const handleSendComment = async () => {
    setEmptyTextError("")

    if (commentText === "") {
      setEmptyTextError(`Comment can't be empty`)
      return
    }

    setCommentText("")
    setCommentImg("")

    const createdComment = await createComment(commentText, postId, commentImg)

    // Get the current state of the commentsArray
    const currentCommentsArray = useCommentsStore.getState().commentsArray

    if (!currentCommentsArray) {
      console.log("here1");

      // If there are no comments yet, set the commentsArray to an array containing the first comment
      useCommentsStore.getState().setCommentsArray([createdComment])
    } else {
      console.log("here2");
      // If there are already comments, add the new comment to the existing array
      useCommentsStore.getState().addComment(createdComment)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    const isDeleted = await deleteComment(commentId)
    if (isDeleted) {
      const updatedCommentsArray = commentsArray.filter(
        (comment) => comment.comment_id !== commentId
      )
      setCommentsArray(updatedCommentsArray)
    }
  }
  const comar = JSON.stringify(commentsArray)

  return (
    <>
      <div className={styles.createComment}>
        <Image
          className={styles.avatarImg}
          src={avatarImg}
          alt="avatar"
          width={50}
          height={50}
        />
        <textarea
          placeholder="Enter your comment"
          autoFocus
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onFocus={() => setAddCommentActive(true)}
        ></textarea>
        <input
          className={styles.avatarBtn}
          type="file"
          accept="image/*,png,jpeg,jpg"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          id="input"
        />

        {addCommentActive && (
          <Image
            src="/assets/icons/addImage.svg"
            alt="addimg"
            width={20}
            height={20}
            onClick={activateInput}
          />
        )}
      </div>
      {commentImg && (
        <div className={styles.ImgPreviewDiv}>
          <div className={styles.clearImgBtn}>
            <Image
              src="/assets/icons/delete.svg"
              alt="Selected"
              className={styles.clearImgBtn}
              width={20}
              height={20}
              onClick={() => setCommentImg("")}
            />
          </div>
          <Image
            src={commentImg.toString()}
            alt="Selected"
            className={styles.previewImg}
            fill
          />
        </div>
      )}

      <div className={styles.commentPostBtnContainer}>
        {addCommentActive && (
          <button className={styles.commentBtn} onClick={handleSendComment}>
            Post
          </button>
        )}
      </div>
      {emptyTextError && (
        <div className={styles.emptyTextError}>{emptyTextError}</div>
      )}

      <div className={styles.divider}></div>

      <div className={styles.commentsContainer}>
        {commentsArray &&
          commentsArray.map((comment) => {
            return (
              <Comment
                key={comment.comment_id}
                comment_id={comment.comment_id}
                content={comment.content}
                author_first_name={comment.author_first_name}
                author_last_name={comment.author_last_name}
                image={comment.image}
                comment_created_at={comment.comment_created_at}
                author_avatar={comment.author_avatar}
                handleDeleteComment={handleDeleteComment}
                likes_count={comment.likes_count}
              />
            )
          })}
      </div>
    </>
  )
}
