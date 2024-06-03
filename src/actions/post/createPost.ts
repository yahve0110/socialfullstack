"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const createUserPost = async (
  postContent: string,
  privacy:string,
  selectedUsersFinal:string[],
  imageBase64?: any,

) => {
  if (!imageBase64) {
    imageBase64 = ""
  }
  try {
    const response = await fetch(URL + "/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        content: postContent,
        image: imageBase64,
        private_users:selectedUsersFinal,
        privacy:privacy.toLowerCase(),
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error creating post:", error)
  }
}
