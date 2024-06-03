import Container from "@/components/ PageContainer/Container"
import Image from "next/image"
import styles from "./CreateGroup.module.css"
import { useState } from "react"
import { handleFileChange } from "@/helpers/imageUpload"
import { MAX_FILE_SIZE_MB } from "@/globals"
import { createGroup } from "@/actions/groups/createGroup"
import { navigateToGroup } from "../helpers"

export default function CreateGroup() {
  //<-------------------STATE------------------------------>
  const [emptyTextError, setEmptyTextError] = useState("")
  const [groupImg, setGroupImg] = useState<string | ArrayBuffer | null>(null)
  const [groupTitle, setGroupTitle] = useState("")
  const [groupDesctiption, setGroupDesctiption] = useState("")

  //<-------------------HANDLERS------------------------------>

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
        setGroupImg(response)
      }
    }
  }

  const createGroupHandler = async () => {
    // Check if the title is empty
    if (groupTitle.trim() === "") {
      setEmptyTextError("Group title cannot be empty")
      return // Exit early if title is empty
    }
    if (groupDesctiption.trim() === "") {
      setEmptyTextError("Group description cannot be empty")
      return // Exit early if title is empty
    }
    // Reset any previous error message
    setEmptyTextError("")

    // Log group details or proceed with group creation
    console.log("Group Title:", groupTitle)
    console.log("Group Description:", groupDesctiption)
    console.log("Group Image:", groupImg)
    const response = await createGroup(groupTitle, groupDesctiption,groupImg)
    console.log(response)

    navigateToGroup(response.GroupID)
  }

  //<-------------------JSX------------------------------>

  return (
    <div>
      <Container>
        <div className={styles.creatGroupWrapper}>
          <label>Title:</label>
          <input
            className={styles.titleInput}
            type="text"
            placeholder="Group title"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
            pattern=".{3,20}"
            required
            maxLength={20}
          />

          <label>About:</label>
          <textarea
            className={styles.groupAbout}
            placeholder="Group desctiption"
            required
            maxLength={200}
            minLength={3}
            value={groupDesctiption}
            onChange={(e) => setGroupDesctiption(e.target.value)}
          ></textarea>
          <div>
            <div className={styles.addImageDiv}>
              <p>Add group image:</p>{" "}
              <Image
                src="/assets/icons/addImage.svg"
                alt="addimg"
                width={25}
                height={25}
                onClick={activateInput}
              />
            </div>
            <input
              className={styles.avatarBtn}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              id="input"
            />
            <div className={styles.errorDiv}>{emptyTextError}</div>
            <div className={styles.previewDiv}>
              {groupImg && (
                <div className={styles.ImgPreviewDiv}>
                  <div className={styles.clearImgBtn}>
                    <Image
                      src="/assets/icons/delete.svg"
                      alt="Selected"
                      className={styles.clearImgBtn}
                      width={20}
                      height={20}
                      onClick={() => setGroupImg("")}
                    />
                  </div>
                  <Image
                    src={groupImg.toString()}
                    alt="Selected"
                    className={styles.previewImg}
                    width={300}
                    height={300}
                  />
                </div>
              )}
            </div>
            <div className={styles.buttonDiv}>
              <button onClick={createGroupHandler}>Add</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
