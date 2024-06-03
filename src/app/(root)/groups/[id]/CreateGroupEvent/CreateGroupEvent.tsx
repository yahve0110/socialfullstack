import { useState } from "react"
import styles from "./CreateGroupEvent.module.css"
import { createGroupEvent } from "@/actions/groups/createEvent"
import { useGroupFeedStore } from "@/lib/state/groupFeedSore"
import Image from "next/image"
import { MAX_FILE_SIZE_MB } from "@/globals"
import { handleFileChange } from "@/helpers/imageUpload"
import { sendNotification } from "@/actions/notifications/sendNotification"
import { sendNotificationWs } from "@/app/(root)/layout"
import { usePersonStore } from "@/lib/state/userStore"

export default function CreateGroupEvent({
  groupId,
  setShowCreateEvent,
}: {
  groupId: string
  setShowCreateEvent: (closeEvent: boolean) => void
}) {
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [emptyTextError, setEmptyTextError] = useState("")
  const [eventImg, setEventImg] = useState<string | ArrayBuffer | null>(null)

  const groupFeed = useGroupFeedStore((state) => state.postsArray)
  const addGroupPost = useGroupFeedStore((state) => state.addPost)
  const setPosts = useGroupFeedStore((state) => state.setPostsArray)
  const currentUserId = usePersonStore((state) => state.userID)

  const createEventHandler = async () => {
    try {
      if (!eventTitle || !eventDate) {
        setEmptyTextError("Event title and date are required.")
        return
      }

      // Adjust the format of the event date string
      const formattedDate = new Date(eventDate.replace("T", " ")).toISOString()

      const newEvent = await createGroupEvent(
        groupId,
        eventTitle,
        eventDescription,
        formattedDate,
        eventImg
      )
      sendNotification("", "group_event", "New group event", groupId)
      sendNotificationWs(groupId, currentUserId, "New event created!", "event")

      if (!groupFeed) {
        setPosts([newEvent])
      } else {
        addGroupPost(newEvent)
      }
      setShowCreateEvent(false)
    } catch (error) {
      console.error("Error creating group event:", error)
    }
  }

  //image handling
  function activateInput() {
    const input = document.getElementById("input")
    input?.click()
  }

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
        setEventImg(response)
      }
    }
  }

  return (
    <div className={styles.crateEventContainer}>
      <div className={styles.inputs}>
        <div className={styles.leftPart}>
          <label htmlFor="">Event title:</label>

          <input
            className={styles.titleInput}
            type="text"
            maxLength={40}
            minLength={3}
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event title"
          />
          <label htmlFor="">Event date:</label>

          <input
            type="datetime-local"
            value={eventDate || new Date().toISOString().slice(0, 16)}
            onChange={(e) => {
              setEventDate(e.target.value)
            }}
          />
        </div>
        <div className={styles.rightPart}>
          <textarea
            maxLength={300}
            minLength={3}
            placeholder="Event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          ></textarea>
          <Image
            className={styles.activateImage}
            src="/assets/icons/addImage.svg"
            alt="addimg"
            width={20}
            height={20}
            onClick={activateInput}
          />
          <input
            className={styles.avatarBtn}
            type="file"
            accept="image/*,png,jpeg,jpg"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            id="input"
          />
        </div>
      </div>
      <div>
        {eventImg && (
          <div className={styles.ImgPreviewDiv}>
            <div className={styles.clearImgBtn}>
              <Image
                src="/assets/icons/delete.svg"
                alt="Selected"
                className={styles.clearImgBtn}
                width={20}
                height={20}
                onClick={() => setEventImg("")}
              />
            </div>

            <Image
              src={eventImg.toString()}
              alt="Selected"
              className={styles.previewImg}
              fill
            />
          </div>
        )}
      </div>
      {emptyTextError && <p>{emptyTextError}</p>}
      <div className={styles.bottomPart}>
        {" "}
        <button onClick={createEventHandler}>Create</button>
      </div>
    </div>
  )
}
