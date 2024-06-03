"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const createGroup = async (
  groupName: string,
  groupDescription: string,
  groupImage:string | ArrayBuffer | null

) => {
  if(!groupImage){
    groupImage=""
  }

  try {
    const response = await fetch(URL + "/createGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_name: groupName,
        group_description:groupDescription,
        group_image:groupImage
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error creating group:", error)
  }
}
