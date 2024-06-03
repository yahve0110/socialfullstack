"use client"
// InputFormActive.tsx
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import styles from "./CreatePost.module.css"
import { usePersonStore } from "@/lib/state/userStore"
import { FC } from "react"
import { MAX_FILE_SIZE_MB } from "@/globals"
import { handleFileChange } from "@/helpers/imageUpload"
import { createUserPost } from "@/actions/post/createPost"
import { useProfilePostStore } from "@/lib/state/profilePostStore"
import { createGroupPost } from "@/actions/groups/createGroupPost"
interface PostFormInactiveProps {
  setFormActive: React.Dispatch<React.SetStateAction<boolean>>
  placeholder?: string
}

interface InputFormActiveProps {
  formActive: boolean
  setFormActive: React.Dispatch<React.SetStateAction<boolean>>
  addPostToGroupFeedHandler?:(text:string,image:string | ArrayBuffer | null) => void
  followers?: any[]
}

export const InputFormInactive: FC<PostFormInactiveProps> = ({
  setFormActive,
}) => {
  return (
    <div
      className={styles.createPostContainer}
      onClick={() => setFormActive(true)}
    >
      <div className={styles.leftPart}>
        <Image
          src="/assets/icons/search.svg"
          alt="avatar"
          width={20}
          height={20}
        />
        <p>Add post</p>
      </div>
      <Image
        src="/assets/icons/addImage.svg"
        alt="addimg"
        width={15}
        height={15}
      />
    </div>
  )
}

type CreatePostType = {
  placeholder: string
  addPostToGroupFeedHandler?:(text:string,image:string | ArrayBuffer | null) => void

  followers?: any[]
}

export default function CreatePost({
  placeholder,
  followers,
  addPostToGroupFeedHandler,

}: CreatePostType) {
  const [formActive, setFormActive] = useState(false)
  if (addPostToGroupFeedHandler) {
    return (
      <InputFormActive
        followers={followers}
        formActive={formActive}
        setFormActive={setFormActive}
        addPostToGroupFeedHandler={addPostToGroupFeedHandler}
      />
    )
  }
  return (
    <>
      {formActive ? (
        <InputFormActive
          followers={followers}
          formActive={formActive}
          setFormActive={setFormActive}
          addPostToGroupFeedHandler={addPostToGroupFeedHandler}
        />
      ) : (
        <InputFormInactive
          setFormActive={setFormActive}
          placeholder={placeholder}
        />
      )}
    </>
  )
}

function InputFormActive({
  formActive,
  setFormActive,
  followers,
  addPostToGroupFeedHandler,
}: InputFormActiveProps) {
  //<----------------------STATE----------------------->
  const [postImg, setPostImg] = useState<string | ArrayBuffer | null>(null)
  const [postText, setPostText] = useState("")
  const [emptyTextError, setEmptyTextError] = useState("")
  const formRef = useRef<HTMLDivElement>(null)
  const [openModal, setOpenModal] = useState(false)
  const [privacy, setPrivacy] = useState("Public")
  const [openUsersModal, setOpenUsersModal] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedUsersFinal, setSelectedUsersFinal] = useState<string[]>([])

  const avatarImg = usePersonStore((state) => state.avatar)

  function activateInput() {
    const input = document.getElementById("input")
    input?.click()
  }

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
        setPostImg(response)
      }
    }
  }
  const addPost = useProfilePostStore((state) => state.addPost)
  const postsArray = useProfilePostStore((state) => state.postsArray);
  const setPostsArray = useProfilePostStore((state) => state.setPostsArray);

  const handlePostClick = async () => {
    setEmptyTextError("")

    if (postText === "") {
      setEmptyTextError(`Form can't be empty`)
      return
    }
    if (!addPostToGroupFeedHandler) {
      const newPost = await createUserPost(
        postText,
        privacy,
        selectedUsersFinal,
        postImg
      )
      if(!postsArray){
        setPostsArray([newPost])
      }else{
        addPost(newPost)

      }
    }
    if (addPostToGroupFeedHandler) {
      addPostToGroupFeedHandler(postText,postImg)
      setFormActive(false)
    }

    setFormActive(false)
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFormActive(false)
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])

  const handleAlmostPrivate = () => {
    setOpenUsersModal(true)
    setPrivacy("Almost Private")
  }
  const handleCloseUserModal = () => {
    setOpenUsersModal(false)
    setPrivacy("Public")
  }
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  const handleAddPrivateUsers = () => {
    setSelectedUsersFinal([...selectedUsers])
    setOpenUsersModal(false)
    setPrivacy("almost private")
    console.log("selectedUsers: ", selectedUsers)
  }

  //<----------------------JSX----------------------->
  return (
    <div className={styles.ActiveCreatePostContainer} ref={formRef}>
      {openUsersModal && (
        <div className={styles.almostPrivateModal}>
          <div>
            <h2>Choose followers that able to see your post</h2>

            {followers &&
              followers.length > 0 &&
              followers.map((el) => {
                if (selectedUsersFinal.includes(el.user_id)) {
                  return
                }
                return (
                  <div className={styles.modalItem} key={el.user_id}>
                    <div>
                      <Image
                        src={el.profilePicture}
                        alt="avatar"
                        width={100}
                        height={100}
                      />
                      <div>
                        {el.first_name} {el.last_name}
                      </div>
                    </div>
                    <input
                      className={styles.modalCheckbox}
                      type="checkbox"
                      onChange={(event) =>
                        handleCheckboxChange(event, el.user_id)
                      }
                    />
                  </div>
                )
              })}
          </div>
          <div className={styles.modalBottom}>
            <button onClick={handleCloseUserModal}>Close</button>
            <button onClick={handleAddPrivateUsers}>Add</button>
          </div>
        </div>
      )}

      <div className={styles.activeImgs}>
        <div>
          <Image
            className={styles.avatarImg}
            src={avatarImg}
            alt="avatar"
            width={80}
            height={80}
          />
        </div>
        <Image
          src="/assets/icons/addImage.svg"
          alt="addimg"
          width={20}
          height={20}
          onClick={activateInput}
        />
      </div>
      <div className={styles.secondPostPart}>
        <textarea
          className={styles.ActiveCreatePostContainerTextarea}
          placeholder="what's new?"
          autoFocus
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>

        {emptyTextError && (
          <div className={styles.emptyTextError}>{emptyTextError}</div>
        )}
        <input
          className={styles.avatarBtn}
          type="file"
          accept="image/*,png,jpeg,jpg"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          id="input"
        />
        {postImg && (
          <div className={styles.ImgPreviewDiv}>
            <div className={styles.clearImgBtn}>
              <Image
                src="/assets/icons/delete.svg"
                alt="Selected"
                className={styles.clearImgBtn}
                width={20}
                height={20}
                onClick={() => setPostImg("")}
              />
            </div>
            <Image
              src={postImg.toString()}
              alt="Selected"
              className={styles.previewImg}
              fill
            />
          </div>
        )}
        <div className={styles.lowerPostDiv}>
          {!addPostToGroupFeedHandler && (
            <div
              className={styles.privacyDiv}
              onClick={() => setOpenModal(!openModal)}
            >
              <p>Privacy:</p>
              <div>
                {privacy}
                <Image
                  className={openModal ? styles.reverseArrow : ""}
                  src={"/assets/imgs/arrow.png"}
                  width={15}
                  height={15}
                  alt="arrow"
                />
                {openModal && (
                  <div className={styles.privacyModalDiv}>
                    <div onClick={() => setPrivacy("Public")}>
                      Public
                      <p>For all users</p>
                    </div>
                    <div onClick={() => setPrivacy("Private")}>
                      Private
                      <p>For followers</p>
                    </div>

                    <div onClick={handleAlmostPrivate}>
                      Almost private
                      <p>For specified followers</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedUsers && selectedUsers.length > 0 && (
            <div>
              {selectedUsers && (
                <div>private users selected: {selectedUsers.length} </div>
              )}
            </div>
          )}
          <button className={styles.postBtn} onClick={handlePostClick}>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
