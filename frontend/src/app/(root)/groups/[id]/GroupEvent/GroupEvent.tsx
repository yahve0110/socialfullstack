import { useEffect, useState } from "react"
import styles from "./GroupEvent.module.css"
import Image from "next/image"
import { joinEvent } from "@/actions/groups/joinEvent"
import { declineEvent } from "@/actions/groups/declineEvent"
import { usePersonStore } from "@/lib/state/userStore"

export type eventOptionsType = {
  going: string[] | null
  not_going: string[] | null
}

type GroupEventType = {
  id: string
  title: string
  content: string
  creationTime: string
  eventImg: string
  eventOptions: eventOptionsType
}

export default function GroupEvent(props: GroupEventType) {
  const { id, title, content, creationTime, eventImg, eventOptions } = props
  const [userVoted, setUserVoted] = useState(false)
  const [votingData, setVotingData] = useState({
    goingNr: 0,
    notGoingNr: 0,
  })
  const [goingProgress, setGoingProgress] = useState(0)
  const [notGoingProgress, setNotGoingProgress] = useState(0)

  // Function to format the creation time
  function formatCreationTime(creationTime: string) {
    const date = new Date(creationTime)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const meridiem = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12

    return `${day}.${month}.${year} ${formattedHours}:${minutes} ${meridiem}`
  }
  const currentUserId = usePersonStore((state) => state.userID)

  useEffect(() => {
    setUserVoted(false)
    setVotingData({
      goingNr: eventOptions.going ? eventOptions.going.length : 0,
      notGoingNr: eventOptions.not_going ? eventOptions.not_going.length : 0,
    })

    if (eventOptions.going && eventOptions.going.includes(currentUserId)) {
      setUserVoted(true)
    }

    if (
      eventOptions.not_going &&
      eventOptions.not_going.includes(currentUserId)
    ) {
      setUserVoted(true)
    }
  }, [eventOptions, currentUserId])

  function checkVote(selectedOption: string) {
    if (selectedOption) {
      if (selectedOption === "going") {
        setVotingData((prevData) => ({
          ...prevData,
          goingNr: prevData.goingNr + 1,
        }))
      } else {
        setVotingData((prevData) => ({
          ...prevData,
          notGoingNr: prevData.notGoingNr + 1,
        }))
      }
      setUserVoted(true)
    } else {
      alert("Please select an option before voting.")
    }
  }

  const joinEventHandler = async () => {
    const joined = await joinEvent(id)
    if (joined) {
      checkVote("going")
    }
  }

  const declineEventHandler = async () => {
    const declined = await declineEvent(id)
    if (declined) {
      checkVote("notGoing")
    }
  }

  useEffect(() => {
    // Calculate the total votes
    const totalVotes = votingData.goingNr + votingData.notGoingNr

    // Calculate progress percentages
    const goingProgress = (votingData.goingNr / totalVotes) * 100
    const notGoingProgress = (votingData.notGoingNr / totalVotes) * 100

    // Set the progress state
    setGoingProgress(goingProgress)
    setNotGoingProgress(notGoingProgress)
  }, [votingData])

  return (
    <div className={styles.eventContainer} id={id}>
      <div className={styles.eventUpper}>
        <div className={styles.eventAuthor}></div>
        <div className={styles.dateTime}>
          <p className={styles.eventDate}>{formatCreationTime(creationTime)}</p>
        </div>
      </div>
      <h2>{title}</h2>
      <p className={styles.eventAbout}>{content}</p>
      {eventImg && (
        <Image
          className={styles.eventImg}
          src={eventImg}
          alt="rock"
          width={300}
          height={300}
        />
      )}

      <h3 className={styles.question}>Will you go?</h3>

      {!userVoted && (
        <div>
          <div className={styles.votingBlock}>
            <button
              onClick={joinEventHandler}
            >
              Yes
              <Image
                src="/assets/icons/ok.svg"
                alt="rock"
                width={16}
                height={16}
              />
            </button>
            <button
              onClick={declineEventHandler}
            >
              No
              <Image
                src="/assets/icons/notok.svg"
                alt="rock"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      )}

      {userVoted && (
        <div>
          <div className={styles.goingProgress}>
            <div className={styles.goingUsersNr}>
              Accepted: {votingData.goingNr}
            </div>
            <div
              className={styles.goingProgressFill}
              style={{ width: `${goingProgress}%` }}
            ></div>
            <p>{goingProgress.toFixed()}%</p>
          </div>
          <div className={styles.notGoingProgress}>
            <div className={styles.notGoingUsersNr}>
              Refused: {votingData.notGoingNr}
            </div>
            <div
              className={styles.notGoingProgressFill}
              style={{ width: `${notGoingProgress}%` }}
            ></div>
            <p>{notGoingProgress.toFixed()}%</p>
          </div>
        </div>
      )}
    </div>
  )
}
