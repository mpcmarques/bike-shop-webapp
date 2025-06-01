import type { NextRequest } from "next/server";
import { withAdmin } from "./app/api/auth/withAdmin";
import { auth } from "./app/api/auth/[...nextauth]/auth";

export default function middleware(request: NextRequest) {
  if (request?.nextUrl?.pathname?.startsWith("/dashboard")) {
    return withAdmin(request);
  }

  auth();
}
