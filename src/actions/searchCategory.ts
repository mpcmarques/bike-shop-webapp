"use server";

import { ICategoryData } from "@/types";
import { API_URL } from "../lib/constants";

export async function searchCategory(
  name: string,
  queryString?: { [key: string]: string },
): Promise<{ data?: ICategoryData[]; error?: string }> {
  const url = new URL(`${API_URL}/category/search/${name}`);

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

    return { data };
  }

  return { error: response.statusText };
}
