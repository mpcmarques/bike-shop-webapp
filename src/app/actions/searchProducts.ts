"use server";

import { IProductData } from "@/types";

export async function searchProducts(
  name: string,
  queryString?: { [key: string]: string }
): Promise<IProductData[] | null> {
  const url = new URL(`http://localhost:3000/product/search/${name}`);

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
