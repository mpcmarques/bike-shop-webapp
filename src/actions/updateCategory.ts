"use server";

import { auth } from "../app/api/auth/[...nextauth]/auth";
import { API_URL } from "../lib/constants";
import {
  createCategoryFormData,
  createCategorySchema,
} from "../lib/validation/createCategorySchema";

export async function updateCategory(
  data: createCategoryFormData,
): Promise<{ data?: any; error?: string }> {
  const validData = createCategorySchema.parse(data);

  const session = await auth();

  if (!session) return { error: "Not Authorized" };

  const response = await fetch(`${API_URL}/category`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(validData),
  });

  if (response.ok) {
    const data = await response.json();

    return { data };
  }

  return { error: response.statusText };
}
