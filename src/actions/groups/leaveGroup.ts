"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const leaveGroup = async (groupId: string) => {

  try {
    const response = await fetch(URL + `/leaveGroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: groupId,
      }),
    })

    if (response.ok) {
      return true
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error leaving group :", error)
  }
}
