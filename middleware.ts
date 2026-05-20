import {NextResponse, type NextRequest} from "next/server";

const publicAdminPaths = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (publicAdminPaths.some((path) => pathname.startsWith(path))) return NextResponse.next();

  const session = request.cookies.get("admin_session")?.value;
  if (!session) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
