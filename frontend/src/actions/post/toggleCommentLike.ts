"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const toggleCommentLike = async (id: string) => {

  try {
    const response = await fetch(URL + "/addCommentLike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        comment_id: id,
      }),
    })
    if (response.ok) {

    const responseData = await response.json()



     return responseData

    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error signing in:", error)
  }
}
