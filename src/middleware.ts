import NextAuth from "next-auth";
import authConfig from "../auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "../routes";

// admin
import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./utils/isValidPassword";
import { currentRole, currentUser } from "./lib/auth";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = true;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isAdminRoute = nextUrl.pathname.includes("admin");

  if (isApiAuthRoute) return null; // return null or return only means that, middleware dont act

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/log-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // if (isAdminRoute) {
  //   if (!isLoggedIn) {
  //     return Response.redirect(new URL("/userAdminForm", nextUrl));
  //   }
  // }

  return null;
});

// designed to match almost any route in your Next.js application
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export const middleware = async (req: NextRequest) => {
//   if ((await isAuthenticated(req)) == false) {
//     return new NextResponse("Unauthorized", {
//       status: 401,
//       headers: { "WWW-Authenticate": "Basic" },
//     });
//   }
// };

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

// export const config = {
//   matcher: "/admin/:path*",
// };

// ---------------------------------------
