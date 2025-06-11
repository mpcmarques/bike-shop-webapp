"use server";

import { IProductData } from "@/types";
import { auth } from "../api/auth/[...nextauth]/auth";
import { API_URL } from "../lib/constants";

export async function deleteProduct(
  data: IProductData,
): Promise<{ error?: string }> {
  const session = await auth();

  if (!session) return { error: "Not authorized" };

  const response = await fetch(`${API_URL}/product`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      id: data._id,
    }),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return { error: response.statusText };
}
