"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const deleteGroupPost = async (groupId:string,postId: string) => {

  try {
    const response = await fetch(URL + "/deleteGroupPost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id:groupId,
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
    console.error("Error deleting group post:", error)
  }
}
