import React, { useEffect, useState } from "react";
import styles from "../profile.module.css";
import { MyGroupProps } from "../../groups/MyGroups/MyGroups";
import { getMyGroups } from "@/actions/groups/getMyGroups";
import Image from "next/image";
import Link from "next/link";

const GroupsBlock = React.memo(function GroupsBlock() {
  const [groupsArr, setGroupsArr] = useState<MyGroupProps[]>([]);

  useEffect(() => {
    async function showUserGroups() {
      const myGroups = await getMyGroups();
      setGroupsArr(myGroups);
    }
    showUserGroups();
  }, []);

  return (
    <div className={styles.groupsBlock}>
      <h4>Groups</h4>
      <div>
        {groupsArr &&
          groupsArr.map((el) => {
            return (
              <Link href={`/groups/${el.GroupID}`} key={el.GroupID} id={el.GroupID} className={styles.groupItem}>
                <Image
                  src={"https://cdn0.iconfinder.com/data/icons/avatar-1-2/512/group-512.png"}
                  alt="group avatar"
                  width={40}
                  height={40}
                />{" "}
                {el.group_name}
              </Link>
            );
          })}
      </div>
    </div>
  );
});

export default GroupsBlock;
