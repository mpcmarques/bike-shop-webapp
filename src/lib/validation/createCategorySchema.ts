import { z } from "zod/v4";

export const createCategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  label: z.string().nonempty("Label is required"),
  description: z.string().nonempty("Description is required"),
  showInMenu: z.boolean().nonoptional("Show in menu is missing"),
});

export type createCategoryFormData = z.infer<typeof createCategorySchema>;
