"use server"
import { FormData } from "@/app/(auth)/signup/SignUpUi"
import { URL } from "@/globals"

export async function signUp(formData: FormData) {

  try {
    const response = await fetch(URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Failed to sign up:", errorText)
      return errorText
    }

    if (response.ok) {
      return "success"
    }
  } catch (error) {
    console.error("Error signing up:", error)
    return "Server error please try again later"
  }
}
