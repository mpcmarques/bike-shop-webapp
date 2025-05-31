"use server";

import { auth } from "../api/auth/[...nextauth]/auth";
import { ICategory } from "@/types";

export async function createCategory(data: ICategory) {
  const session = await auth();

  if (!session) return;

  const response = await fetch("http://localhost:3000/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = response.json();

    return data;
  }

  return null;
}
