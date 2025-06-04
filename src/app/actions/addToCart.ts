"use server";

import { API_URL } from "../lib/constants";
import { IProductData } from "@/types";
import { auth } from "../api/auth/[...nextauth]/auth";

export async function addToCart(data: IProductData) {
  const session = await auth();

  if (!session) return;

  const response = await fetch(`${API_URL}/user/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({ productId: data._id }),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
