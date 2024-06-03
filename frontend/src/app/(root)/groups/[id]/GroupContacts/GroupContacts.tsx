import Image from "next/image"
import styles from "./GroupContacts.module.css"
import Link from "next/link"

interface CreatorInfo {
  user_id: string
  first_name: string
  last_name: string
  profilePicture: string
}

interface GroupContactsProps {
  creatorInfo: CreatorInfo[]
}

const GroupContacts: React.FC<GroupContactsProps> = ({ creatorInfo }) => {
  return (
    <div className={styles.contactsWrapper}>
      <h6>Admin</h6>
      {creatorInfo.map((creator) => (
        <Link href={`/profile/${creator.user_id}`} key={creator.user_id} className={styles.info}>
          <Image
            key={creator.user_id}
            className={styles.avatar}
            src={creator.profilePicture}
            width={50}
            height={50}
            alt="avatar"
          />
          <p>
            {creator.first_name} {creator.last_name}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default GroupContacts
