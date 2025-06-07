"use server";

import { IProduct } from "@/types";
import { auth } from "../api/auth/[...nextauth]/auth";
import { API_URL } from "../lib/constants";

export async function updateProduct(data: IProduct) {
  const session = await auth();

  if (!session) return;

  const response = await fetch(`${API_URL}/product`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
