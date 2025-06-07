"use server";

import { IProductData } from "@/types";
import { API_URL } from "../lib/constants";

export async function getProducts(queryString?: {
  [key: string]: string | undefined | number;
}): Promise<IProductData[] | null> {
  const url = new URL(`${API_URL}/product`);

  if (queryString)
    Object.entries(queryString).map((param) => {
      if (param[1]) url.searchParams.append(param[0], `${param[1]}`);
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
