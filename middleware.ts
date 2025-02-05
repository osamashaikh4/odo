import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookieStore = req.cookies;
  const token = cookieStore.get("odo-access-token")?.value;

  if (token) {
    const decoded = jwtDecode<{ user: { userID: string; type: string } }>(
      token
    );

    if (
      path.startsWith("/login") ||
      path.startsWith("/register") ||
      (decoded &&
        decoded.user &&
        decoded.user.type !== "admin" &&
        path.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (path.startsWith("/home")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
