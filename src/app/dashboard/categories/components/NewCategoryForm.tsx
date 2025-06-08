"use client";

import { createCategory } from "@/app/actions/createCategory";
import { ICategory } from "@/types";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const NewCategoryForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ICategory>({});

  const onSubmit: SubmitHandler<ICategory> = useCallback(async (data) => {
    await createCategory(data);
  }, []);

  return (
    <div className=" w-full p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>Name</div>
        <input
          type="text"
          {...register("name")}
          className=" border border-zinc-700 rounded text-white px-2 py-1"
        />
        <div>Label</div>
        <input
          type="text"
          {...register("label")}
          className=" border border-zinc-700 rounded text-white px-2 py-1"
        />
        <div>Description</div>
        <textarea
          {...register("description")}
          className=" border border-zinc-700 rounded text-white px-2 py-1"
        />
        <button type="submit" className="bg-blue-600 rounded-xl px-4 py-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
