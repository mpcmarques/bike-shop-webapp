"use client";

import { createProduct } from "@/app/actions/createProduct";
import ProductSearch from "@/components/productSearch";
import { ICategoryData, IProduct, IProductDataWithVariants } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import VariationAttributeSelector from "./VariationAttributeSelector";
import ComposedCombinationsSelector from "./ComposedCombinationsSelector";

interface INewCategoryFormProps {
  categories: Array<ICategoryData>;
}

const NewCategoryForm: React.FC<INewCategoryFormProps> = ({ categories }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IProduct>({});

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    console.log("Submitting form", data);

    const res = await createProduct(data);

    console.log("res", res);
  };

  const productType = watch("productType");
  const variationAttributes = watch("variationAttributes");
  const masterProduct = watch("masterProduct");
  const composedCombinations = watch("composed");

  return (
    <div className=" w-full p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <label className="font-bold">Name</label>
        <input
          type="text"
          {...register("name")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label className="font-bold">Label</label>
        <input
          type="text"
          {...register("label")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label className="font-bold">Description</label>
        <textarea
          {...register("description")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label className="font-bold">Type</label>
        <select
          {...register("productType")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        >
          <option value="master">Master</option>
          <option value="variant">Variant</option>
          <option value="composed">Composed</option>
        </select>

        {productType === "variant" ? (
          <>
            <VariationAttributeSelector
              variationAttributes={variationAttributes}
              setVariationAttributes={(value) =>
                setValue("variationAttributes", value)
              }
            />
            <div className="flex flex-col gap-2">
              <label className="font-bold">Master Product</label>

              {masterProduct ? (
                <div className="bg-zinc-700 px-4 py-2 border-zinc-600">
                  {masterProduct.label}
                </div>
              ) : null}

              <ProductSearch
                onChange={(value) =>
                  setValue("masterProduct", value as IProductDataWithVariants)
                }
                productType="master"
              />
            </div>
          </>
        ) : null}

        {productType === "composed" ? (
          <>
            <label className="font-bold">Combinations</label>

            {masterProduct ? (
              <div className="bg-zinc-700 px-4 py-2 border-zinc-600">
                {masterProduct.label}
              </div>
            ) : null}
            <ComposedCombinationsSelector
              composed={composedCombinations}
              setComposedCombinations={(value) => setValue("composed", value)}
            />
          </>
        ) : null}

        <label className="font-bold">Category</label>
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

        <label className="font-bold">List Price</label>
        <input
          type="text"
          {...register("listPrice")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />
        <label className="font-bold">Sales Price</label>
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
