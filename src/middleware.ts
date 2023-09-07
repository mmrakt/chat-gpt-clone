import { request } from "http";
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// TODO: 認証状態でredirectさせる
// pagesオプションを設定すると　/ ではなく /signin にredirectされてしまう
export default withAuth(function middleware(req) {});

export const config = { matcher: ["/foo"] };
