import { usePersonStore, User } from "@/lib/state/userStore"
import styles from "./GroupAbout.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getGroupEnterRequests } from "@/actions/groups/getAllGroupEnterRequests"
import { acceptGroupEnterRequest } from "@/actions/groups/acceptGroupEnterRequest"
import { deleteGroup } from "@/actions/groups/deleteGroup"
import { navigateToGroupPage, navigateToProfile } from "../../helpers"
import { inviteUserToGroup } from "@/actions/groups/inviteUserToGroup"
import { getAllUninvitedFollowers } from "@/actions/groups/getAllUninvitedFollowers"
import { leaveGroup } from "@/actions/groups/leaveGroup"
import { sendNotification } from "@/actions/notifications/sendNotification"
import { sendNotificationWs } from "@/app/(root)/layout"

type UserType = {
  user_id: string
  profilePicture: string
  first_name: string
  last_name: string
}

type GroupAboutType = {
  groupId: string
  creatorId: string
  groupName: string
  groupDescription: string
  groupImg: string
}
interface UserRequest {
  user_id: string
  firstName: string
  lastName: string
  profilePicture: string
  user: UserType
}

interface UserRequest extends UserType {
  user: UserType
}

export default function GroupAbout({
  groupId,
  creatorId,
  groupName,
  groupDescription,
  groupImg,
}: GroupAboutType) {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [inviteToGroupModal, setInviteToGroupModal] = useState(false)
  const [userFollowers, setUserFollowers] = useState<UserType[]>([])
  const [usersRequests, setUsersRequests] = useState<UserRequest[]>([])
  const currentUserId = usePersonStore((state) => state.userID)

  useEffect(() => {
    async function getRequest() {
      const enterRequests = await getGroupEnterRequests(groupId)
      const getCurrentUserFollowers = await getAllUninvitedFollowers(groupId)

      setUserFollowers(getCurrentUserFollowers)
      setUsersRequests(enterRequests)
    }
    getRequest()
  }, [])

  const acceptRequestHandler = async (userId: string) => {
    const isAccepted = await acceptGroupEnterRequest(userId, groupId)
    if (isAccepted) {
      // Filter out the accepted user from the current state
      const newUsersRequests = usersRequests.filter(
        (user) => user.user_id !== userId
      )
      // Update the state with the filtered user requests
      setUsersRequests(newUsersRequests)
      if (setUsersRequests.length == 0) {
        setUsersRequests([])
      }
    }
  }

  const deleteGroupHandler = async () => {
    // Prompt the user for confirmation
    if (window.confirm("Are you sure you want to delete this group?")) {
      // If user confirms, proceed with the deletion
      const groupDeleted = await deleteGroup(groupId)
      if (groupDeleted) {
        navigateToGroupPage()
      }
    }
  }



  const inviteUserToGroupHandler = async (userId: string) => {
    const isInvited = await inviteUserToGroup(groupId, userId)
    sendNotification(userId,"group_invite","New group invite",groupId)
    sendNotificationWs(userId,currentUserId,"New group invite!", "group_invite")


    if (isInvited) {
      const newUserFollowers = userFollowers.filter(
        (user) => user.user_id !== userId
      )
      setUserFollowers(newUserFollowers)
      setInviteToGroupModal(false)
    }
  }

  const leaveGroupHandler = async ()=>{
      const leftSuccessfully = await leaveGroup(groupId)
      if(leftSuccessfully){
        navigateToProfile()      }
  }

  return (
    <div className={styles.groupAbout}>
      <Image
        src={groupImg}
        alt="group avatar"
        width={1000}
        height={1000}
        className={styles.coverImg}
      />
      <div className={styles.groupInfo}>
        <h2>{groupName}</h2>
        <p className={styles.about}>{groupDescription}</p>

        {currentUserId === creatorId && (
          <div
            className={styles.groupSettings}
            onClick={() => {
              setSettingsModalOpen(!settingsModalOpen)
            }}
          >
            <button>Settings</button>
            <Image
              className={styles.settingIcon}
              src={"/assets/icons/gear.svg"}
              width={10}
              height={10}
              alt="gear"
            />
          </div>
        )}
        {currentUserId !== creatorId && (
          <div className={styles.leave} onClick={leaveGroupHandler}>
            Leave group
            <Image
              src={"/assets/icons/leave.svg"}
              width={15}
              height={15}
              alt="leave img"
            />
          </div>
        )}
        <div
          className={styles.invite}
          onClick={() => setInviteToGroupModal(!inviteToGroupModal)}
        >
          Invite to group
          <Image
              src={"/assets/icons/addPerson.svg"}
              width={15}
              height={15}
              alt="leave img"
            />
        </div>

        {inviteToGroupModal && (
          <div className={styles.inviteToGroupModal}>
                   <Image
            className={styles.closeModal}
            onClick={() => {
              setInviteToGroupModal(false)
            }}
            src={"/assets/icons/delete.svg"}
            width={30}
            height={30}
            alt="gear"
          />
            <div>
              {userFollowers &&
                userFollowers.map((el) => {
                  return (
                    <div
                      key={el.user_id}
                      id={el.user_id}
                      className={styles.inviteUserDiv}
                    >
                      <div className={styles.userDivInfo}>
                        <Image
                          src={el.profilePicture}
                          width={150}
                          height={150}
                          alt="avatar"
                        />
                        {el.first_name} {el.last_name}
                      </div>
                      <div
                        className={styles.inviteDivBtn}
                        onClick={() => inviteUserToGroupHandler(el.user_id)}
                      >
                        Invite{" "}
                        <Image
                          src={"/assets/icons/ok.svg"}
                          width={20}
                          height={20}
                          alt="invite"
                        />
                      </div>
                    </div>
                  )
                })}

              {!userFollowers && <div>No followers to invite</div>}
            </div>
          </div>
        )}
      </div>
      {settingsModalOpen && (
        <div className={styles.modalSettings}>
          <Image
            className={styles.closeModal}
            onClick={() => {
              setSettingsModalOpen(false)
            }}
            src={"/assets/icons/delete.svg"}
            width={30}
            height={30}
            alt="gear"
          />

          <div className={styles.requests}>
            <h2>Group enter requests</h2>
            <div className={styles.requestsDiv}>
              {usersRequests ? (
                usersRequests.map((el) => {
                  return (
                    <div
                      key={el.user.user_id}
                      className={styles.requestDiv}
                      id={el.user.user_id}
                    >
                      <div className={styles.requestInfo}>
                        <Image
                          className={styles.userRequestAvatar}
                          src={el.user.profilePicture}
                          width={100}
                          height={100}
                          alt="avatar"
                        />
                        <p>
                          {el.user.first_name} {el.user.last_name}{" "}
                        </p>
                      </div>
                      <div className={styles.requestAccept}>
                        <button
                          onClick={() => acceptRequestHandler(el.user.user_id)}
                        >
                          Accept{" "}
                          <Image
                            src={"/assets/icons/ok.svg"}
                            alt="avatar"
                            width={15}
                            height={15}
                          />
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className={styles.noEnteRequests}>No requests</div>
              )}
            </div>
          </div>
          <button className={styles.deleteGroup} onClick={deleteGroupHandler}>
            Delete group
          </button>
        </div>
      )}
    </div>
  )
}
