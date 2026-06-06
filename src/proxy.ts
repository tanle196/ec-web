import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "@/constants/cookies";

const PROTECTED_ROUTES = ["/account"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && !request.cookies.get(ACCESS_TOKEN)?.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
