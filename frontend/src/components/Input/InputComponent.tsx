import styles from "./Input.module.css"
import Image from "next/image"

type InputComponent={
  sortHandler:(a:string)=>void
}

export default function InputComponent({sortHandler}:InputComponent) {
  return (
    <div className={styles.searchForFriendsDiv}>
      <input type="text" placeholder="Search for friends" onChange={(e)=>sortHandler(e.target.value)} />
      <div className={styles.searchImgDiv}>
        <Image
          src="/assets/imgs/search.png"
          alt="searchIcon"
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}
