"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const sendNotification = async (receiverId: string,type:string,content:string,groupId:string) => {
  try {
    const response = await fetch(URL + "/sendNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        receiver_id: receiverId,
        type:type,
        content:content,
        group_id:groupId,

      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error creating notification:", error)
  }
}
