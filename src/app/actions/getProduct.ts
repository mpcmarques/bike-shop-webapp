"use server";

import { API_URL } from "../lib/constants";

export async function getProduct(name: string) {
  const response = await fetch(`${API_URL}/product/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return { error: response.statusText };
}
