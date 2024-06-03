"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const sendPrivateMessage = async (chatId: string, content: string) => {
  try {
    const response = await fetch(URL + "/sendPrivateMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        content: content,
        chat_id: chatId,
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error sending message:", error)
  }
}
