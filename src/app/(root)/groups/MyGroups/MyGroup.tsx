import Link from "next/link"
import styles from "./ MyGroups.module.css"
import Image from "next/image"

export type MyGroupType = {
  group_id: string
  group_name: string
}

export default function MyGroup({group_name,group_id}:MyGroupType) {
  return (
<Link href={`/groups/${group_id}`} className={styles.link}>
<div className={styles.myGroup} id={group_id}>
      <Image
        src={
          "https://cdn0.iconfinder.com/data/icons/avatar-1-2/512/group-512.png"
        }
        alt="group avatar"
        width={80}
        height={80}
      />
      <div>
        <p className={styles.groupName}>{group_name}</p>
      </div>
    </div>
</Link>
  )
}
