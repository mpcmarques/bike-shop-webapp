"use client";

import { createProduct } from "@/actions/createProduct";
import ProductSearch from "@/components/productSearch";
import {
  ICategoryData,
  IProduct,
  IProductData,
  IProductDataWithVariants,
} from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import VariationAttributeSelector from "./VariationAttributeSelector";
import ComposedCombinationsSelector from "./ComposedCombinationsSelector";
import { useCallback, useTransition } from "react";
import { updateProduct } from "@/actions/updateProduct";
import { redirect } from "next/navigation";
import { deleteProduct } from "@/actions/deleteProduct";
import ErrorCard from "@/components/ErrorCard";

interface IEditProductFormProps {
  product?: IProductData;
  categories: Array<ICategoryData>;
}

const EditProductForm: React.FC<IEditProductFormProps> = ({
  product,
  categories,
}) => {
  const [isDeleting, startDeleting] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IProduct>({
    defaultValues: product,
  });

  const onSubmit: SubmitHandler<IProduct> = useCallback(
    async (data) => {
      if (product) {
        const res = await updateProduct(data);

        if (res.error) {
          setError("root", {
            message: res.error,
          });
        }
        return;
      }

      const { error } = await createProduct(data);

      if (error) {
        setError("root", {
          message: error,
        });
      }
    },
    [product, setError],
  );

  const handleDelete = useCallback(
    async (product: IProductData) => {
      if (!product) return;

      startDeleting(async () => {
        const { error } = await deleteProduct(product);

        if (error) {
          setError("root", {
            message: error,
          });
        } else {
          redirect("/dashboard/products");
        }
      });
    },
    [setError],
  );

  const productType = watch("productType");
  const variationAttributes = watch("variationAttributes");
  const masterProduct = watch("masterProduct");
  const composedCombinations = watch("composed");

  return (
    <div className="flex flex-col gap-4 w-full p-8">
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
            <ComposedCombinationsSelector
              composed={composedCombinations || []}
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
          type="number"
          {...register("listPrice")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />
        <label className="font-bold">Sales Price</label>
        <input
          type="number"
          {...register("salesPrice")}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        <label className="font-bold">Stock</label>
        <input
          type="number"
          {...register("stock")}
          step={1}
          className="border border-zinc-700 rounded text-white px-2 py-1"
        />

        {errors.root ? <ErrorCard error={errors.root.message} /> : null}

        <button
          type="submit"
          className="bg-blue-600 rounded-xl px-4 py-2 hover:bg-blue-500 hover:cursor-pointer disabled:bg-blue-900 disabled:pointer-events-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : product ? "Update" : "Create"}
        </button>
      </form>

      {product ? (
        <button
          className="bg-red-700 rounded-xl px-4 py-2 hover:bg-red-500 hover:cursor-pointer disabled:bg-red-900 disabled:pointer-events-none"
          disabled={isSubmitting || isDeleting}
          onClick={() => handleDelete(product)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      ) : null}
    </div>
  );
};

export default EditProductForm;
