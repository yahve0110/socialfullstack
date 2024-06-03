"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const toggleGroupPostLike = async (groupId: string, postId: string) => {
  try {
    const response = await fetch(URL + "/addGroupPostLike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: groupId,
        post_id: postId,
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error toggling like:", error)
  }
}
