"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getNotifications = async () => {
  try {
    const response = await fetch(URL + `/getNotifications`, {
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
    console.error("Error getting notifications:", error)
  }
}
