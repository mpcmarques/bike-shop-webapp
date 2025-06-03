"use server";

import { IProductDataWithVariants } from "@/types";

export async function getProduct(
  name: string
): Promise<IProductDataWithVariants | null> {
  const response = await fetch(`http://localhost:3000/product/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
