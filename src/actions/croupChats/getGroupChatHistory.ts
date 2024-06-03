"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getGroupChatHistory = async (groupId: string) => {
  try {
    const response = await fetch(
      `${URL}/getGroupChatHistory?chat_id=${groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies().toString(),
        },
      }
    )
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error getting group chat history:", error)
  }
}
