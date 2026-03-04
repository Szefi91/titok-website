import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AKTA_ENABLED, isAktaTimeWindow } from "@/lib/features";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/aktak")) {
    if (!AKTA_ENABLED) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // /aktak list oldal maradhat nyitva, de a konkrét akta csak időablakban érhető el (kivéve dev)
    if (process.env.NODE_ENV !== "development" && pathname !== "/aktak" && !isAktaTimeWindow()) {
      const url = request.nextUrl.clone();
      url.pathname = "/aktak";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/aktak/:path*"],
};
