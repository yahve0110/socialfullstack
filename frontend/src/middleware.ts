
import { NextRequest, NextResponse } from "next/server"
import { isSessionValid } from "./actions/auth/sessionCheck"

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("sessionID")?.value

  if (!cookie) {
    console.error("SessionID cookie is undefined.")
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  const user = await isSessionValid(cookie)

  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/friends/:path*",
    "/messages/:path*",
    "/groups/:path*",
    "/news",
  ],
}
