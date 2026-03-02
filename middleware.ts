import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AKTA_ENABLED, isAktaTimeWindow } from "@/lib/features";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/aktak")) {
    if (!AKTA_ENABLED || !isAktaTimeWindow()) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/aktak/:path*"],
};
