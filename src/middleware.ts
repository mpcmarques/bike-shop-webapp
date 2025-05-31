import type { NextRequest } from "next/server";
import { withAdmin } from "./app/api/auth/withAdmin";

export default function middleware(request: NextRequest) {
  if (request?.nextUrl?.pathname?.startsWith("/dashboard")) {
    return withAdmin(request);
  }
}
