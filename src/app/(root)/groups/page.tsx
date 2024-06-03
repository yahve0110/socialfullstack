"use client"

import { useState } from "react"
import GroupSearch from "./GroupSearch/GroupSearch"
import styles from "./Groups.module.css"
import MyGroups from "./MyGroups/MyGroups"
import SwitchPages from "./SwitchGroupPages/SwitchPages"
import CreateGroup from "./createGroup/CreateGroup"
import PendingGroupRequests from "./pendingGroupRequests/PendingGroupRequests"
import GroupInvites from "./Invites/GroupInvites"

export default function Groups() {
  const [pageNr, setMyGroupsPage] = useState(0)
  return (
    <div className={styles.groupsContainer}>
      <div className={styles.groupsWrapper}>
        {pageNr === 0 && <MyGroups />}
        {pageNr === 1 && <GroupSearch />}
        {pageNr === 2 && <CreateGroup />}
        {pageNr === 3 && <PendingGroupRequests />}
        {pageNr === 4 && <GroupInvites />}
      </div>
      <div className={styles.sidebar}>
        <SwitchPages setMyGroupsPage={setMyGroupsPage} pageNr={pageNr} />
     
      </div>
    </div>
  )
}
