"use server";

import { auth } from "../api/auth/[...nextauth]/auth";
import { ICategory } from "@/types";
import { API_URL } from "../lib/constants";

export async function createCategory(data: ICategory) {
  const session = await auth();

  if (!session) return;

  const response = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return null;
}
