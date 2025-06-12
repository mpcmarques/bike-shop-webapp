"use client";

import { IProductData, IProductDataWithVariants } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

const VariantSelector = ({
  masterProduct,
  selectedVariant,
}: {
  masterProduct: IProductDataWithVariants;
  selectedVariant: IProductData;
}) => {
  const sorted = useMemo(() => {
    return masterProduct.variants.sort((a, b) =>
      a.salesPrice < b.salesPrice ? -1 : 1,
    );
  }, [masterProduct.variants]);

  return (
    <div className="flex gap-3">
      {sorted.map((variant: IProductData) => (
        <Link
          key={variant._id}
          href={`/product/${variant.name}`}
          className={`flex flex-col border-2 border-zinc-500 rounded-xl hover:border-zinc-400 transition-colors px-4 py-2 ${
            selectedVariant._id === variant._id ? "bg-zinc-600 " : ""
          } ${variant.stock === 0 ? " border-zinc-800" : ""}`}
        >
          <span>{variant.label}</span>
          {variant.stock === 0 ? (
            <span className="text-sm text-red-900 font-bold">Out of Stock</span>
          ) : null}
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
