import { getPendingGroupRequests } from "@/actions/groups/getPendingGroupequests"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./PendingGroup.module.css"

interface PendingGroup {
  group_id: string
  group_name: string
}

const PendingGroupRequests: React.FC = () => {
  const [pendingGroups, setPendingGroups] = useState<PendingGroup[]>([])

  useEffect(() => {
    async function getPendingGroups() {
      const pendingGroupsData = await getPendingGroupRequests()
      if (pendingGroupsData) {
        setPendingGroups(pendingGroupsData)
      }
    }
    getPendingGroups()
  }, [])

  return (
    <div>
      {pendingGroups &&
        pendingGroups.map((group) => {
          return (
            <div key={group.group_id} className={styles.groupContainer}>
              <div className={styles.groupInfo}>
                {" "}
                <Image
                  src={
                    "https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Group-512.png"
                  }
                  alt="group avatar"
                  width={60}
                  height={60}
                />{" "}
                {group.group_name}
              </div>
              <div>Status: waiting for approvement...</div>
            </div>
          )
        })}
      {pendingGroups.length < 1 && (
        <div className={styles.noRequests}>No pending requests,all good</div>
      )}
    </div>
  )
}

export default PendingGroupRequests
