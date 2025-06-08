"use server";

import { API_URL } from "../lib/constants";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export async function getCartItems() {
  const session = await auth();

  if (!session) return redirect("/login");

  const response = await fetch(`${API_URL}/user/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
