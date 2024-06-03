"use server"
import { cookies } from "next/headers"
import { URL } from "@/globals"

export const getPendingFollowers = async (userID:string) => {
  try {
    const response = await fetch(URL + `/getPendingFollowers?user_id=${userID}`, {
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
      return response.statusText
    }
  } catch (error) {
    console.error("Error getting pending followers:", error)
    return "serverError"
  }
}
