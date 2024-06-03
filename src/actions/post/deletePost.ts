"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const deleteUserPost = async (postId: string) => {

  try {
    const response = await fetch(URL + "/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        post_id: postId,
      }),
    })
    if (response.ok) {
        return true
    } else {
      console.error("Failed to get data:", response.statusText)
      return false

    }
  } catch (error) {
    console.error("Error deleting post:", error)
  }
}
