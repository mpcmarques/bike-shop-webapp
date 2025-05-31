import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./[...nextauth]/auth";

// This function can be marked `async` if using `await` inside
export async function withUser(request: NextRequest) {
  const session = await auth();

  const userRoles = session?.user; // Assuming 'role' is part of the session object

  if (userRoles) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
