"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const deleteNotification = async (notificationId: string) => {
  try {
    const response = await fetch(`${URL}/deleteNotification?notification_id=${notificationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    })
    if (response.ok) {
      return true
    } else {
      console.error("Failed to delete :", response.statusText)
      return false
    }
  } catch (error) {
    console.error("Error deleting:", error)
  }
}
