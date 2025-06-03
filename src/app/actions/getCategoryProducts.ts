"use server";

import { ICategoryData } from "@/types";

export async function getCategoryProducts(
  name: string,
  queryString?: { [key: string]: string }
): Promise<ICategoryData | null> {
  const url = new URL(`http://localhost:3000/category/${name}/products`);

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
