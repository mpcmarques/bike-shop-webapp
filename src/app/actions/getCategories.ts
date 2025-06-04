"use server";

import { ICategoryData } from "@/types";
import { API_URL } from "../lib/constants";

export async function getCategories(): Promise<Array<ICategoryData>> {
  const response = await fetch(`${API_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return [];
}
