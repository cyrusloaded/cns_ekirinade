// import {NextResponse, type NextRequest} from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET ?? "NQm5y9V8fL2Xc7KsR4zTp8WnJ1HbEa6D";
// const COOKIE_NAME = "admin_session";

// const PUBLIC_ADMIN_PATHS = [
//   "/admin/login",
//   "/admin/forgot-password",
//   "/admin/reset-password",
// ];

// // Routes only accessible by Super Admin
// const SUPER_ADMIN_PATHS = ["/admin/manage-admins"];

// interface SessionPayload {
//   id: string;
//   email: string;
//   role: string;
// }

// export function middleware(request: NextRequest) {
//   const {pathname} = request.nextUrl;

//   if (!pathname.startsWith("/admin")) return NextResponse.next();
//   if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p)))
//     return NextResponse.next();

//   const token = request.cookies.get(COOKIE_NAME)?.value;

//   if (!token) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/admin/login";
//     url.searchParams.set("next", pathname);
//     return NextResponse.redirect(url);
//   }

//   try {
//     const session = jwt.verify(token, JWT_SECRET) as SessionPayload;

//     // Guard Super Admin-only routes
//     if (
//       SUPER_ADMIN_PATHS.some((p) => pathname.startsWith(p)) &&
//       session.role !== "SUPER_ADMIN"
//     ) {
//       const url = request.nextUrl.clone();
//       url.pathname = "/admin";
//       return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("JWT Verify Error:", error);

//     const url = request.nextUrl.clone();
//     url.pathname = "/admin/login";
//     url.searchParams.set("next", pathname);

//     const response = NextResponse.redirect(url);
//     response.cookies.delete(COOKIE_NAME);

//     return response;
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import {NextResponse, type NextRequest} from "next/server";
import {jwtVerify} from "jose";

const COOKIE_NAME = "admin_session";

const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

const SUPER_ADMIN_PATHS = ["/admin/manage-admins"];

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "rn0Gt87eADud372Axy8tJMtSeQsJtaszlJPnIpdicJE=",
);

interface SessionPayload {
  id: string;
  email: string;
  role: string;
}

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  try {
    const {payload} = await jwtVerify(token, secret);

    const session = payload as unknown as SessionPayload;

    if (
      SUPER_ADMIN_PATHS.some((p) => pathname.startsWith(p)) &&
      session.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error(err);

    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);

    const response = NextResponse.redirect(url);
    response.cookies.delete(COOKIE_NAME);

    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
