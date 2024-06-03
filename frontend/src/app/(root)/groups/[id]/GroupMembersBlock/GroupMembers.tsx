import Image from "next/image"
import { GroupMembersResponse } from "../page"
import styles from "./GroupMembers.module.css"
import Link from "next/link"

export default function GroupMembers({
  members,
}: {
  members: GroupMembersResponse
}) {
  return (
    <div className={styles.membersBlock}>
      <div className={styles.membersHeading}>Members</div>
      <div className={styles.membersDiv}>
      {members.Members &&
        members.Members.map((el) => {
          return (
            <Link href={`/profile/${el.user_id}`} key={el.user_id} id={el.user_id}  className={styles.userBlock}>
              <Image
              key={el.user_id}
              className={styles.avatar}
                src={el.profilePicture}
                width={50}
                height={50}
                alt="avatar"
              />
              <div className={styles.name}>
                {el.first_name}
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
