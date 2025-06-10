"use client";

import { createCategory } from "@/app/actions/createCategory";
import { updateCategory } from "@/app/actions/updateCategory";
import {
  createCategoryFormData,
  createCategorySchema,
} from "@/app/lib/validation/createCategorySchema";
import ErrorCard from "@/components/ErrorCard";
import FormInputField from "@/components/FormInput";
import FormTextArea from "@/components/FormTextArea";
import { ICategoryData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const EditCategoryForm = ({ category }: { category?: ICategoryData }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<createCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: category,
  });

  const onSubmit: SubmitHandler<createCategoryFormData> = useCallback(
    async (data) => {
      if (!category) {
        const { error } = await createCategory(data);

        if (error) {
          setError("root", {
            message: error,
          });
        }
      }

      const { error } = await updateCategory(data);

      if (error) {
        setError("root", {
          message: error,
        });
      }
    },
    [category, setError],
  );

  return (
    <div className=" w-full p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInputField
          label={<>Name</>}
          inputProps={{
            type: "text",
            ...register("name"),
          }}
          error={errors.name?.message}
        />

        <FormInputField
          label={<>Label</>}
          inputProps={{
            type: "text",
            ...register("label"),
          }}
          error={errors.label?.message}
        />

        <FormTextArea
          label={<>Description</>}
          inputProps={{
            ...register("description"),
          }}
          error={errors.description?.message}
        />

        <FormInputField
          label={<>Show in menu</>}
          inputProps={{
            type: "checkbox",
            ...register("showInMenu"),
          }}
          error={errors.showInMenu?.message}
        />

        {errors.root ? <ErrorCard error={errors.root.message} /> : null}

        <button
          type="submit"
          className="bg-blue-600 rounded-xl px-4 py-2 hover:bg-blue-500 hover:cursor-pointer disabled:bg-blue-900 disabled:pointer-events-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : category ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
