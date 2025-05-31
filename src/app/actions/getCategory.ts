"use server";

import { ICategoryData } from "@/types";

export async function getCategory(name: string): Promise<ICategoryData | null> {
  const response = await fetch(`http://localhost:3000/category/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = response.json();

    return data;
  }

  return null;
}
