"use server";

import { ICategoryData } from "@/types";
import { API_URL } from "../lib/constants";

export async function getCategoryProducts(
  name: string,
  queryString?: { [key: string]: string }
): Promise<ICategoryData | null> {
  const url = new URL(`${API_URL}/category/${name}/products`);

  if (queryString)
    Object.entries(queryString).map((param) => {
      url.searchParams.append(param[0], param[1]);
    });

  const response = await fetch(url, {
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
