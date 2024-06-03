"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const acceptPendingFollower = async (userId: string) => {

  try {
    const response = await fetch(URL + "/acceptPendingFollowers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        user_pending: userId,
      }),
    })
    if (response.ok) {

      return true
    } else {
      console.error("Failed to accept follower:", response.statusText)
    }
  } catch (error) {
    console.error("Error accepting follower:", error)
  }
}
