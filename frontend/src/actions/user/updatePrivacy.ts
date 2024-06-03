"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const changeUserPrivacy = async (privacy: string) => {
  if (privacy === "public") {
    privacy = "private"
  } else if (privacy === "private") {
    privacy = "public"
  }

  try {
    const response = await fetch(URL + "/privacyUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        privacy: privacy,
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData.privacy
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error updating privacy:", error)
  }
}
