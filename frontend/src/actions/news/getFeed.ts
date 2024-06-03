"use server"

import { URL } from "@/globals"
import { useProfilePostStore } from "@/lib/state/profilePostStore"
import { cookies } from "next/headers"

export const getUserFeed = async () => {
  try {
    const response = await fetch(URL + "/getUserFeed", {
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
    console.error("Error getting user feed :", error)
    return "serverError"
  }
}
