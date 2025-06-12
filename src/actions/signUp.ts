"use server";

import { API_URL } from "../lib/constants";
import { signUpFormData, signUpSchema } from "../lib/validation/signUpSchema";

export async function signUp(
  data: signUpFormData,
): Promise<{ data?: any; error?: string }> {
  const validData = signUpSchema.parse(data);

  const url = new URL(`${API_URL}/user`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validData),
  });

  if (response.ok) {
    const data = await response.json();

    return { data };
  }

  return { error: response.statusText };
}
