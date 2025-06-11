"use server";

import { API_URL } from "../lib/constants";
import { auth } from "../api/auth/[...nextauth]/auth";
import { ICategoryData } from "@/types";

export async function getCategories(): Promise<
  ICategoryData[] | { error: string }
> {
  const session = await auth();

  if (!session) return { error: "Not Authorized" };

  const response = await fetch(`${API_URL}/category`, {
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
