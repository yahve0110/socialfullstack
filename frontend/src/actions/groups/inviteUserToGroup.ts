"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const inviteUserToGroup = async (groupId: string, userId: string) => {
  try {
    const response = await fetch(URL + "/inviteToGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: groupId,
        receiver_id: userId,

      }),
    })
    if (response.ok) {

      return true
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error inviting to a group:", error)
  }
}
