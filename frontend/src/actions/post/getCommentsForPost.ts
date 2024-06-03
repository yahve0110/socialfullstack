"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getComments = async (postId: string) => {
  try {
    const response = await fetch(URL + `/comments?post_id=${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
      return false
    }
  } catch (error) {
    console.error("Error getting comments for post:", error)
  }
}
