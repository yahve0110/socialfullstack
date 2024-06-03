import React from "react";
import { joinGroupRequest } from "@/actions/groups/requestGroupEnter";
import styles from "./GroupSearch.module.css";
import Image from "next/image";
import { sendNotification } from "@/actions/notifications/sendNotification";
import { usePersonStore } from "@/lib/state/userStore";
import { sendNotificationWs } from "../../layout";

export type GroupType = {
  GroupID: string;
  CreatorID: string;
  group_name: string;
  groups: GroupType[];
  setGroups: (groups: GroupType[]) => void;
};

const GroupBlock = ({
  GroupID,
  group_name,
  groups,
  CreatorID,
  setGroups,
}: GroupType) => {
  const currentUserId = usePersonStore((state) => state.userID);

  const requestJoinGroupHandler = async () => {
    const requested = await joinGroupRequest(GroupID);
    sendNotification("", "group_request", "New group enter request", GroupID);
    sendNotificationWs(
      CreatorID,
      currentUserId,
      "New group join request!",
      "group_request"
    );

    if (requested) {
      const newGroups = groups.filter((el) => el.GroupID !== GroupID);
      setGroups(newGroups);
    }
  };

  return (
    <div className={styles.groupBlock} id={GroupID}>
      <div className={styles.groupBlockLeft}>
        <Image
          src={
            "https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Group-512.png"
          }
          alt="group avatar"
          width={60}
          height={60}
        />
        <div>
          <p className={styles.groupName}>{group_name}</p>
        </div>
      </div>
      <button
        className={styles.subscribeBtn}
        onClick={requestJoinGroupHandler}
      >
        Subscribe
      </button>
    </div>
  );
};

export default GroupBlock;
