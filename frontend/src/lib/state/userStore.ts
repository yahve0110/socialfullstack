import { create } from "zustand";

export type User = {
  userID: string;
  about: string;
  birth_date: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  username: string;
  privacy:string;
};

type Action = {
  updateUserID: (id: User["userID"]) => void;
  updateFirstName: (firstName: User["firstName"]) => void;
  updateLastName: (lastName: User["lastName"]) => void;
  updateAbout: (about: User["about"]) => void;
  updateBirthDate: (birth_date: User["birth_date"]) => void;
  updateEmail: (email: User["email"]) => void;
  updateGender: (gender: User["gender"]) => void;
  updateAvatar: (avatar: User["avatar"]) => void;
  updateUsername: (username: User["username"]) => void;
  updatePrivacy: (privacy: User["privacy"]) => void;
};

export const usePersonStore = create<User & Action>((set) => ({
  userID: "", 
  firstName: "John",
  lastName: "Doe",
  about:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  birth_date: "00.00.0000",
  email: "test@test.com",
  gender: "Neutral",
  avatar:
    "https://res.cloudinary.com/djkotlye3/image/upload/v1711275268/zm3vbgtmcr7i4g1l2s4t.png",
  username: "",
  privacy: "",

  updateUserID: (id) => set(() => ({ userID: id })),
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
  updateAbout: (about) => set(() => ({ about: about })),
  updateBirthDate: (birth_date) => set(() => ({ birth_date: birth_date })),
  updateEmail: (email) => set(() => ({ email: email })),
  updateGender: (gender) => set(() => ({ gender: gender })),
  updateAvatar: (avatar) => set(() => ({ avatar: avatar })),
  updateUsername: (username) => set(() => ({ username: username })),
  updatePrivacy: (privacy) => set(() => ({ privacy: privacy })),
}));
