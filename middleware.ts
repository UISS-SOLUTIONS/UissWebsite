import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest) {

  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req: request, secret });

  const protectedRoutes = ["/AdminPanel"];
  const isProtectedRoute = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/AdminPanel/:path*"],
};