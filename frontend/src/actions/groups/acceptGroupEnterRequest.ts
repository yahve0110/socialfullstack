"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const acceptGroupEnterRequest = async (
  userId: string,
  groupId: string
) => {
  try {
    const response = await fetch(URL + `/acceptGroupEnterRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: groupId,
        user_id: userId,
      }),
    })

    if (response.ok) {
      return true
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error accepting group enter request:", error)
  }
}
