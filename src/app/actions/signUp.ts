"use server";

import { IProductData } from "@/types";
import { API_URL } from "../lib/constants";

export async function signUp(data: {
  email: string;
  password: string;
  postalCode: string;
  address: string;
  firstName: string;
  lastName: string;
  floor: string;
  door: string;
  city: string;
}): Promise<IProductData[] | null> {
  const url = new URL(`${API_URL}/user`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
