"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getChatHistory = async (chatId:string) => {
  try {
    const response = await fetch(URL + `/getChatHistory?chat_id=${chatId}`, {
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
    console.error("Error getting chat history:", error)
  }
}
