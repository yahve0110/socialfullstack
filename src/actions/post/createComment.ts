"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const createComment = async (
  postContent: string,
  postId:string,
  imageBase64?: any
) => {


  if (!imageBase64) {
    imageBase64 = ""
  }
  try {
    const response = await fetch(URL + "/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        content: postContent,
        post_id:postId,
        image: imageBase64,
      }),
    })
    if (response.ok) {
      const responseData = await response.json()



      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
    }
  } catch (error) {
    console.error("Error creatin comment:", error)
  }
}
