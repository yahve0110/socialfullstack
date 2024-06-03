"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getGroupEnterRequests = async (groupID: string) => {
  try {
    const response = await fetch(URL + `/getAllGroupEnterRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: groupID,
      }),
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error joining group enter requests:", error)
  }
}
