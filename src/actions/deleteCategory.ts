"use server";

import { ICategoryData } from "@/types";
import { auth } from "../app/api/auth/[...nextauth]/auth";
import { API_URL } from "../lib/constants";

export async function deleteCategory(
  data: ICategoryData,
): Promise<{ data?: any; error?: string }> {
  const session = await auth();

  if (!session) return { error: "Not Authorized" };

  const response = await fetch(`${API_URL}/category`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      id: data._id,
    }),
  });

  if (response.ok) {
    const data = await response.json();

    return { data };
  }

  return { error: response.statusText };
}
