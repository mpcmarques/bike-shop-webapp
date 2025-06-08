"use client";

import { searchCategory } from "@/app/actions/searchCategory";
import { ICategoryData } from "@/types";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const CategorySearch = ({
  onChange,
}: {
  onChange: (value: ICategoryData) => void;
}) => {
  const [text, setText] = useState("");
  const [values, setValues] = useState<ICategoryData[]>([]);

  const handleTextChange = useDebouncedCallback(async (text: string) => {
    setText(text);

    if (text.length > 2) {
      const data = await searchCategory(text);

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
            {values.map((category) => (
              <div
                key={category._id}
                className="hover:cursor-pointer text-zinc-300 hover:text-zinc-100"
                onClick={() => {
                  setText("");
                  onChange(category);
                  setValues([]);
                }}
              >
                <div>{category.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
