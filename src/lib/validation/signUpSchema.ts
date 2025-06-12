import { z } from "zod/v4";

export const signUpSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    address: z.string().nonempty("Address is required"),
    floor: z.string().nonempty("Floor is required"),
    door: z.string().nonempty("Door is required"),
    postalCode: z.string().nonempty("Postal code is required"),
    city: z.string().nonempty("City is required"),
    email: z.email().nonempty("E-mail is required"),
    password: z.string().nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type signUpFormData = z.infer<typeof signUpSchema>;
