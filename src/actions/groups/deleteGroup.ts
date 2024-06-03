"use server"
import { cookies } from "next/headers"

import { URL } from "@/globals"

export const deleteGroup = async (groupId: string) => {
  try {
    const response = await fetch(URL + "/deleteGroup?group_id=" + groupId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to get data:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting group:", error);
  }
}
