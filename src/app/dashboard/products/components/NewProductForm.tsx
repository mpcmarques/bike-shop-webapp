"use client";

import { createProduct } from "@/app/actions/createProduct";
import { searchProducts } from "@/app/actions/searchProducts";
import { ICategoryData, IProduct, IProductData } from "@/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

const VariationAttributeSelector = ({
  variationAttributes,
  setVariationAttributes,
}: {
  variationAttributes?: Array<{
    type: string;
    value: string;
  }>;
  setVariationAttributes: (
    value: Array<{
      type: string;
      value: string;
    }>
  ) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex w-full justify-between">
        <label className="font-bold">Variation Attributes</label>

        <button
          disabled={
            variationAttributes != null && variationAttributes.length >= 2
          }
          className="text-green-500 hover:cursor-pointer disabled:text-zinc-600 disabled:cursor-default"
          onClick={(e) => {
            e.preventDefault();

            const newVariationAttributes =
              variationAttributes != null ? variationAttributes?.slice() : [];

            newVariationAttributes?.push({ type: "", value: "" });

            setVariationAttributes(newVariationAttributes);
          }}
        >
          Add
        </button>
      </div>

      {variationAttributes?.map((variationAttribute, index) => (
        <div
          key={`variation-attribute-${index}`}
          className="w-full grid grid-cols-12 gap-4"
        >
          <label>Type</label>

          <select
            className="border border-zinc-700 rounded text-white px-2 py-1 col-span-2"
            value={variationAttribute.type}
            onChange={(e) => {
              const newVariationAttributes = variationAttributes.slice();

              if (newVariationAttributes[index]) {
                newVariationAttributes[index].type = e.target.value;
              }

              setVariationAttributes(newVariationAttributes);
            }}
          >
            <option value="">Select Option</option>

            <option value="color">Color</option>

            <option value="size">Size</option>

            <option value="finish">Finish</option>
          </select>

          <label>Value</label>

          <input
            className="border boder-zinc-800 rounded col-span-4"
            value={variationAttribute.value}
            onChange={(e) => {
              const value = e.target.value;

              const newVariationAttributes = variationAttributes.slice();

              if (newVariationAttributes[index]) {
                newVariationAttributes[index].value = value;
              }

              setVariationAttributes(newVariationAttributes);
            }}
          ></input>

          <button
            className="text-red-600 hover:text-red-500 hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();

              const newVariationAttributes = variationAttributes.filter(
                (item, index2) => index2 !== index
              );

              setVariationAttributes(newVariationAttributes);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

const ProductSearch = ({
  onChange,
  productType,
}: {
  onChange: (value: IProductData) => void;
  productType?: string;
}) => {
  const [text, setText] = useState("");
  const [values, setValues] = useState<IProductData[]>([]);

  const handleTextChange = useDebouncedCallback(async (text: string) => {
    setText(text);

    if (text.length > 2) {
      const data = await searchProducts(
        text,
        productType ? { productType } : undefined
      );

      setValues(data || []);
    }
  }, 500);

  return (
    <div className="w-full">
      <input
        type="text"
        onChange={(e) => {
          const value = e.target.value;
          setText(value);
          handleTextChange(e.target.value);
        }}
        value={text}
        className="border border-zinc-700 rounded text-white px-2 py-1 w-full"
      />

      {values.length > 0 && (
        <div className="relative w-full">
          <div className="absolute top-0 left-0 p-2 bg-zinc-600 w-full flex flex-col gap-2">
            {values.map((product) => (
              <div
                key={product._id}
                className="hover:cursor-pointer text-zinc-300 hover:text-zinc-100"
                onClick={() => {
                  setText("");
                  onChange(product);
                  setValues([]);
                }}
              >
                <div>{product.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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

  console.log(categories);

  const productType = watch("productType");
  const variationAttributes = watch("variationAttributes");
  const masterProduct = watch("masterProduct");

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
                onChange={(value) => setValue("masterProduct", value)}
                productType="master"
              />
            </div>
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
