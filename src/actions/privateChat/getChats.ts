"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getChats = async () => {
  try {
    const response = await fetch(URL + `/getChats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
      //   return true
    } else {
      console.error("Failed to get data:", response.statusText)
      return false
    }
  } catch (error) {
    console.error("Error getting chats:", error)
  }
}
