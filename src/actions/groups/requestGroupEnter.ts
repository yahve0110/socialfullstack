"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const joinGroupRequest = async (GroupId: string) => {
  try {
    const response = await fetch(URL + `/sendGroupEnterRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: GroupId,
      }),
    })

    if (response.ok) {
      return true
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error sending group join request:", error)
  }
}
