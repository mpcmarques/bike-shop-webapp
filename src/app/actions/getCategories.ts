"use server";

import { ICategoryData } from "@/types";

export async function getCategories(): Promise<Array<ICategoryData>> {
  const response = await fetch("http://localhost:3000/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = response.json();

    return data;
  }

  return [];
}
