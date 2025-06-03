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
      a.salesPrice < b.salesPrice ? -1 : 1
    );
  }, [masterProduct.variants]);

  return (
    <div className="flex gap-3">
      {sorted.map((variant: IProductData) => (
        <Link
          key={variant._id}
          href={`/product/${variant.name}`}
          className={`border-2 border-zinc-500 rounded-xl px-4 py-2 ${
            selectedVariant._id === variant._id ? "bg-zinc-500 " : ""
          }`}
        >
          <span>{variant.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
