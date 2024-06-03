"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const getAllUninvitedFollowers = async (groupID: string) => {
  try {
    const response = await fetch(
      URL + `/getAllUninvitedFollowers?group_id=${groupID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies().toString(),
        },
      }
    )
    if (response.ok) {
      const responseData = await response.json()
      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error getting uninvitedFolowers:", error)
  }
}
