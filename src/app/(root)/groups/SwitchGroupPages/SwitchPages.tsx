import styles from "./SwitchPages.module.css"

interface SwitchPageType {
  setMyGroupsPage: Function
  pageNr: number
}

export default function SwitchPages({
  setMyGroupsPage,
  pageNr,
}: SwitchPageType) {
  return (
    <div className={styles.switchBlock}>
      <p
        className={pageNr === 0 ? styles.active : ""}
        onClick={() => setMyGroupsPage(0)}
      >
        My groups
      </p>
      <p
        className={pageNr === 1 ? styles.active : ""}
        onClick={() => setMyGroupsPage(1)}
      >
        Search groups
      </p>

      <p
        className={pageNr === 2 ? styles.active : ""}
        onClick={() => setMyGroupsPage(2)}
      >
        Create group
      </p>

      <p
        className={pageNr === 3 ? styles.active : ""}
        onClick={() => setMyGroupsPage(3)}
      >
        Requests
      </p>

      <p
        className={pageNr === 4 ? styles.active : ""}
        onClick={() => setMyGroupsPage(4)}
      >
        Invites
      </p>
    </div>
  )
}
