"use server";

import { API_URL } from "../lib/constants";

export async function searchProducts(
  name: string,
  queryString?: { [key: string]: string | undefined },
) {
  const url = new URL(`${API_URL}/product/search/${name}`);

  if (queryString)
    Object.entries(queryString).map((param) => {
      if (param[1]) url.searchParams.append(param[0], param[1]);
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

  return { error: response.statusText };
}
