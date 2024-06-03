import styles from "./Messages.module.css"

export default function SwitchMessages({
  page,
  setPage,
}: {
  page: number
  setPage: (n: number) => void
}) {
  return (
    <div className={styles.switchDiv}>
      <div
          onClick={()=>setPage(0)}
        className={`${styles.switchOption} ${
          page === 0 ? styles.activeSwitch : ""
        }`}
      >
        Private Messages
      </div>
      <div
      onClick={()=>setPage(1)}
        className={`${styles.switchOption} ${
          page === 1 ? styles.activeSwitch : ""
        }`}
      >
        Group Messages
      </div>
    </div>
  )
}
