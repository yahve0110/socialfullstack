"use server"

import { URL } from "@/globals"
import { useProfilePostStore } from "@/lib/state/profilePostStore"
import { cookies } from "next/headers"

export const getPostsForProfile = async (userId: string) => {
  try {
    const response = await fetch(URL + "/getposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },

      body: JSON.stringify({ user_id: userId }),
    })
    if (response.ok) {
      const responseData = await response.json()
      useProfilePostStore.getState().setPostsArray(responseData)
      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
      console.log(response.statusText)
    }
  } catch (error) {
    console.error("Error getting posts:", error)
    return "serverError"
  }
}
