"use server";

import { API_URL } from "../lib/constants";

export async function getMenuCategories() {
  const response = await fetch(`${API_URL}/category/menu`, {
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
