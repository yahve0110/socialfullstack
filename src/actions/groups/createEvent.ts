"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const createGroupEvent = async (
  group_id: string,
  title: string,
  descrtiption: string,
  date_time: string,
  eventImg?:any
) => {
  try {
    const response = await fetch(URL + "/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: group_id,
        title: title,
        description: descrtiption,
        date_time: date_time,
        event_img:eventImg
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error creating group event:", error)
  }
}
