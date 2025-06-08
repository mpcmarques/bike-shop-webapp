"use server";

import { ICategoryData, IProductData } from "@/types";
import { API_URL } from "../lib/constants";

export async function getCategoryProducts(
  name: string,
  queryString?: { [key: string]: string | string[] },
): Promise<{ category: ICategoryData; products: IProductData[] } | null> {
  const url = new URL(`${API_URL}/category/${name}/products`);

  if (queryString)
    Object.entries(queryString).map((param) => {
      if (Array.isArray(param[1])) {
        param[1].forEach((value) => url.searchParams.append(param[0], value));
      } else {
        url.searchParams.append(param[0], param[1]);
      }
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
