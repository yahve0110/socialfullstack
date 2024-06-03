"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const createGroupPost = async (
  groupId: string,
  content: string,
  postImg:string | ArrayBuffer | null

) => {
  if(!postImg){
    postImg=""
  }

  try {
    const response = await fetch(URL + "/createGroupPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        group_id: groupId,
        content:content,
        group_post_img:postImg
      }),
    })
    if (response.ok) {
      const responseData = await response.json()

      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error creating group post:", error)
  }
}
