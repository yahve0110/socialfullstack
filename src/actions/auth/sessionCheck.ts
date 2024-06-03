import { URL } from "@/globals";

export async function isSessionValid(sessionId:string) {
    try {
        const response = await fetch(URL + "/isSessionValid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
        });


        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking session:", error);
        return false;
    }
}
