"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const signIn = cache(async (formData: FormData) => {
  const request = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const { access_token } = await request.json();

  if (access_token) {
    const cookieStore = await cookies();

    cookieStore.set("session", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return redirect("/");
  }
});

export default signIn;
