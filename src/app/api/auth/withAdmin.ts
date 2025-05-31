import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./[...nextauth]/auth";

// This function can be marked `async` if using `await` inside
export async function withAdmin(request: NextRequest) {
  const session = await auth();

  const userRoles = session?.user?.roles; // Assuming 'role' is part of the session object

  if (userRoles?.includes("admin")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}
