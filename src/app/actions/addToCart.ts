"use server";

import { API_URL } from "../lib/constants";
import { IProductData } from "@/types";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export async function addToCart(
  data: IProductData,
  quantity: number,
  combination?: IProductData[]
) {
  const session = await auth();

  if (!session) return redirect("/login");

  console.log(data, quantity, combination);

  const response = await fetch(`${API_URL}/user/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({ productId: data._id, quantity, combination }),
  });

  console.log(response);

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
