import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  // NOTE: https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", url.pathname);

  if (process.env.NODE_ENV === "production") {
    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");

      if (
        user === process.env.BASIC_AUTH_ID &&
        pwd === process.env.BASIC_AUTH_PASSWORD
      ) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
    }
    url.pathname = "/api/auth";
  }

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}
