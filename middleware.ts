import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/Membership") {
    return NextResponse.redirect(new URL("/membership", request.url), 308);
  }

  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req: request, secret });

  const protectedRoutes = ["/admin"];
  const isProtectedRoute = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Edge check is defense-in-depth only: every mutation re-checks
  // server-side via lib/requireAdmin.ts (red-team #53).
  const role = typeof token?.role === "string" ? token.role : undefined;
  if (isProtectedRoute && (!token || role !== "admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/Membership"],
};
