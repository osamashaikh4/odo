import { NextRequest, NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

const protectedRoutes = [
  "home",
  "shipments",
  "integrations",
  "shipping-partners",
  "pickup-location",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookieStore = req.cookies;
  const token = cookieStore.get("odo-access-token")?.value;

  if (token) {
    // const decoded = jwtDecode<{ user: { userID: string; type: string } }>(
    //   token
    // );
    // (decoded &&
    //   decoded.user &&
    //   decoded.user.type !== "admin" &&
    //   path.startsWith("/admin")
    if (
      path === "/" ||
      path.startsWith("/login") ||
      path.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  } else {
    if (protectedRoutes.some((pr) => path.includes(pr))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
