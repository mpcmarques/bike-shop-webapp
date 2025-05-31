"use server";

import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  try {
    const request = await fetch("http://localhost:3000/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });

    const user = await request.json();

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
