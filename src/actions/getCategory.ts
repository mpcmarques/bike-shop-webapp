"use server";

import { ICategoryData } from "@/types";
import { API_URL } from "../lib/constants";

export async function getCategory(
  name: string,
): Promise<{ data?: ICategoryData; error?: string }> {
  const response = await fetch(`${API_URL}/category/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    return { data };
  }

  return { error: response.statusText };
}
