"use client";

import { createProduct } from "@/app/actions/createProduct";
import { ICategoryData, IProduct } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";

interface INewCategoryFormProps {
  categories: Array<ICategoryData>;
}

const NewCategoryForm: React.FC<INewCategoryFormProps> = ({ categories }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IProduct>({});

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    console.log("Submitting form", data);

    const res = await createProduct(data);

    console.log("res", res);
  };

  console.log(categories);

  return (
    <div className=" w-full p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>Name</label>
        <input
          type="text"
          {...register("name")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label>Label</label>
        <input
          type="text"
          {...register("label")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label>Description</label>
        <textarea
          {...register("description")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label>Type</label>
        <select
          {...register("productType")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        >
          <option value="single">Single</option>
          <option value="bundle">Bundle</option>
          <option value="composed">Composed</option>
        </select>

        <label>Category</label>
        <select
          {...register("category")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.label}
            </option>
          ))}
        </select>

        <label>List Price</label>
        <input
          type="text"
          {...register("listPrice")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />
        <label>Sales Price</label>
        <input
          type="text"
          {...register("salesPrice")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <button type="submit" className="bg-blue-600 rounded-xl px-4 py-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
