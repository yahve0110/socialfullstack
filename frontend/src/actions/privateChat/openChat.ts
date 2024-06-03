"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const openChat = async (userId: string) => {
  try {
    const response = await fetch(URL + "/openChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        user_id_2: userId,
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error opening chat:", error)
  }
}
