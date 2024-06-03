"use server"

import { URL } from "@/globals"
import { cookies } from "next/headers"

export const unFollowUser = async (userId:string) => {
  try {
    const response = await fetch(URL + `/unfollowUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        user_to_unfollow: userId
      })
    })
    if (response.ok) {

      return true
    } else {
      console.error("Failed to get data:", response.statusText)
      console.log(response.statusText)
    }
  } catch (error) {
    console.error("Error unfollowing:", error)
    return "serverError"
  }
}
