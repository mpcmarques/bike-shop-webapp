"use server";

import { auth } from "../api/auth/[...nextauth]/auth";
import { API_URL } from "../lib/constants";

export async function getProducts(queryString?: {
  [key: string]: string | undefined | number;
}) {
  const session = await auth();

  if (!session) return { error: "Not Authorized" };

  const url = new URL(`${API_URL}/product`);

  if (queryString)
    Object.entries(queryString).map((param) => {
      if (param[1]) url.searchParams.append(param[0], `${param[1]}`);
    });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return { error: response.statusText };
}
