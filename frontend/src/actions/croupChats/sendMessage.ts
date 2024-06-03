"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const sendGroupMessage = async (chatId: string,content:string) => {
  try {
    const response = await fetch(URL + "/sendGroupChatMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        chat_id: chatId,
        content:content
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error sending group chat message:", error)
  }
}
