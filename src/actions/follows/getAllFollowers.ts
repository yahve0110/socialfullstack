"use server"

import { URL } from "@/globals"
import { cookies } from "next/headers"

export const getAllFollowers = async (userId:string) => {
  try {
    const response = await fetch(URL + `/getFollowing?user_id=${userId}`, {
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
      console.log(response.statusText)
    }
  } catch (error) {
    console.error("Error getting followers:", error)
    return "serverError"
  }
}
