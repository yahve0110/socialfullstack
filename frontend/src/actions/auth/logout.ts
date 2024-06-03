"use server"

import { URL } from "@/globals";
import { cookies } from "next/headers";

export async function logoutHandler() {
  try {
    const response = await fetch(URL + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log(response.status);

    if (response.ok) {
      cookies().set({
        name: "sessionID",
        value: "",
        expires: new Date(0),
        path: "/",
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error when logout:", error);
    return false;
  }
}
