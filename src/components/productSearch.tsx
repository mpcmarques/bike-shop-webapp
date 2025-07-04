"use client";

import { searchProducts } from "@/actions/searchProducts";
import { ICategoryData, IProductData } from "@/types";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebouncedCallback } from "use-debounce";

const ProductSearch = ({
  onChange,
  productType,
  category,
}: {
  onChange: (value: IProductData) => void;
  productType?: string;
  category?: ICategoryData;
}) => {
  const [text, setText] = useState("");
  const [values, setValues] = useState<IProductData[]>([]);

  const handleTextChange = useDebouncedCallback(async (text: string) => {
    setText(text);

    if (text.length > 2) {
      const { data } = await searchProducts(text, {
        productType: productType,
        category: category?._id,
      });

      setValues(data || []);
    } else {
      setValues([]);
    }
  }, 500);

  return (
    <div className="w-full">
      <div className="border border-zinc-700 rounded text-white px-2 py-1 w-full flex gap-4 items-center">
        <BiSearch />
        <input
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            setText(value);
            handleTextChange(e.target.value);
          }}
          value={text}
          className="bg-transparent border-transparent outline-none w-full"
        />
      </div>

      {values.length > 0 && (
        <div className="relative w-full">
          <div className="absolute top-0 left-0 p-2 bg-zinc-600 w-full flex flex-col gap-2 z-10">
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
