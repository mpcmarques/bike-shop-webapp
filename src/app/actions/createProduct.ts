"use server";

import { IProduct } from "@/types";
import { auth } from "../api/auth/[...nextauth]/auth";

export async function createProduct(data: IProduct) {
  const session = await auth();

  if (!session) return;

  const response = await fetch("http://localhost:3000/product", {
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

  return null;
}
