"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const deleteComment = async (commentID: string) => {
  try {
    const response = await fetch(URL + `/deleteComment?comment_id=${commentID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    })
    if (response.ok) {
      return true
    } else {
      console.error("Failed to get data:", response.statusText)
      return false
    }
  } catch (error) {
    console.error("Error signing in:", error)
  }
}
