import { URL } from "@/globals";


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
    return true
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error when logout:", error);
    return false;
  }
}
