import { useEffect, useState } from "react";
import { getAllFollowers } from "@/actions/follows/getAllFollowers";
import { usePersonStore } from "@/lib/state/userStore";
import { unFollowUser } from "@/actions/follows/unfollowUser";
import FriendCart from "./FriendCart";
import InputComponent from "@/components/Input/InputComponent";
import styles from "../friends.module.css";
import { debounce } from "@/components/Input/inputHelpers";

interface Friend {
  user_id: string;
  profilePicture: string;
  first_name: string;
  last_name: string;
  email: string;
  birthday: string;
  about: string;
}

export default function FriendsPageContent() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [initialFriends, setInitialFriends] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const userId = usePersonStore((state) => state.userID);

  useEffect(() => {
    async function getPossibleFriends() {
      try {
        const friendsArr = await getAllFollowers(userId);
        setFriends(friendsArr);
        setInitialFriends(friendsArr);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getPossibleFriends();
  }, [userId]);

  const unfollowHandlerCallback = async (id: string) => {
    const isUnfollowed = await unFollowUser(id);
    if (isUnfollowed) {
      const newFriendArr = friends.filter((friend) => friend.user_id !== id);
      setFriends(newFriendArr);
    }
  };



  const handleSearch = debounce((params: string) => {
    setSearchTerm(params);
    if (params) {
      const lowerCaseParams = params.toLowerCase();
      const newArr = initialFriends.filter(
        (friend) =>
          friend.first_name.toLowerCase().includes(lowerCaseParams) ||
          friend.last_name.toLowerCase().includes(lowerCaseParams)
      );
      setFriends(newArr);
    } else {
      setFriends(initialFriends);
    }
  }, 300);

  return (
    <div className={styles.searchForFriendsBlock}>
      <InputComponent sortHandler={handleSearch} />
      <div className={styles.divider}></div>

      <div className={styles.friendsBlockContainer}>
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <FriendCart
              key={friend.user_id}
              user_id={friend.user_id}
              profilePicture={friend.profilePicture}
              firstName={friend.first_name}
              lastName={friend.last_name}
              about={friend.about}
              email={friend.email}
              birthday={friend.birthday}
              unfollowHanlderCallback={unfollowHandlerCallback}
            />
          ))
        ) : (
          <div className={styles.noFollows}>No follows</div>
        )}
      </div>
    </div>
  );
}
