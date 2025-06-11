"use server";

import { IProduct } from "@/types";
import { auth } from "../api/auth/[...nextauth]/auth";
import { API_URL } from "../lib/constants";

export async function createProduct(
  data: IProduct,
): Promise<{ error?: string }> {
  const session = await auth();

  if (!session) return { error: "Not authorized" };

  const response = await fetch(`${API_URL}/product`, {
    method: "POST",
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

  return { error: response.statusText };
}
