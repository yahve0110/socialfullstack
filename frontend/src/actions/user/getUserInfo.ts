"use server"
import { cookies } from "next/headers"
import { URL } from "@/globals"


export const getStaticProps = async () => {
  try {
    const response = await fetch(URL + "/getUserInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    })

    if (response.ok) {
      const responseData = await response.json()


      return responseData
    } else {
      console.error("Failed to get data:", response.statusText)
      return response.statusText
    }
  } catch (error) {
    console.error("Error getting user info:", error)
    return "serverError"
  }
}
