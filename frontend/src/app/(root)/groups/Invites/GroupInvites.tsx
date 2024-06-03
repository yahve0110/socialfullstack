import { useEffect, useState } from "react"
import Image from "next/image"
import { getGroupInvites } from "@/actions/groups/getGroupInvitesForUser"
import styles from "./GroupInvites.module.css"
import { acceptGroupInvite } from "@/actions/groups/acceptGroupInvite"

export interface GroupInvite {
  group_id: string
  group_name: string
  group_avatar?: string
}

const GroupInvites: React.FC = () => {
  const [groupInvites, setGroupInvites] = useState<GroupInvite[]>([])

  useEffect(() => {
    async function fetchGroupInvites() {
      try {
        const invitedTo: GroupInvite[] = await getGroupInvites()
        setGroupInvites(invitedTo)
      } catch (error) {
        console.error("Error fetching group invites:", error)
      }
    }
    fetchGroupInvites()
  }, [])

  const acceptInviteHandler = async (group_id:string) => {
    const requestAccepted = await acceptGroupInvite(group_id)
    if(requestAccepted){
      const newGroupInvites = groupInvites.filter(group => group.group_id!== group_id)
      setGroupInvites(newGroupInvites)
    }
  }
console.log(groupInvites)
  return (
    <div>
      {groupInvites ? (
        groupInvites.map((invite) => (
          <div key={invite.group_id} className={styles.inviteDiv}>
            <div className={styles.inviteInfo}>
              <Image
                src={
                  "https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Group-512.png"
                }
                alt="group avatar"
                width={60}
                height={60}
              />
              {invite.group_name}
            </div>
            <div>
              <button
                className={styles.acceptInvite}
                onClick={()=>acceptInviteHandler(invite.group_id)}
              >
                Accept{" "}
                <Image
                  src={"/assets/icons/ok.svg"}
                  width={18}
                  height={18}
                  alt="invite"
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noInvites}>{`You don't have any invites`}</div>
      )}
    </div>
  )
}

export default GroupInvites
