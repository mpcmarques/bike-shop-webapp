"use client";

import { searchProducts } from "@/app/actions/searchProducts";
import { IProductData } from "@/types";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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

export default ProductSearch;
