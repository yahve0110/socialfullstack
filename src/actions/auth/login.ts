"use server"
import { cookies } from "next/headers"
import { URL } from "@/globals"

//sign in function
export async function signIn(username: string, password: string) {
  const data = { username, password }

  try {
    const response = await fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const responseData = await response.json()
      const cookie = responseData.cookie //get cookie from JSON


      const expirationDate = new Date(cookie.Expires)
      //set cookie to browser
      cookies().set({
        name: cookie.Name,
        value: cookie.Value,
        httpOnly: cookie.HttpOnly,
        expires: expirationDate,
        secure: cookie.Secure,
        path: "/",
      })


      return responseData
    } else {
      console.error("Failed to sign in:", response.statusText)
      return response.statusText 
    }
  } catch (error) {
    console.error("Error signing in:", error)
    return "serverError"
  }
}


