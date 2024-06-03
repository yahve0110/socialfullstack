"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getGroupById = async (groupId:string) => {
  try {
    const response = await fetch(`${URL}/getGroupById?groupID=${groupId}`, {
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
    }
  } catch (error) {
    console.error("Error getting group info:", error)
  }
}
