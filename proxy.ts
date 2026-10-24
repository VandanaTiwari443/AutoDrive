import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  const isHomePage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");

  if (!isHomePage && !isAdminPage) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Temporary test: verify only that the cookie exists.
  // JWT verification will be restored after debugging.
  if (isAdminPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
