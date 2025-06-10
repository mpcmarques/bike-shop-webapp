import { z } from "zod/v4";

export const signInSchema = z.object({
  email: z.email().nonempty("E-mail is required"),
  password: z.string().nonempty("Password is required"),
});

export type signInFormData = z.infer<typeof signInSchema>;
