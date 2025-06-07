"use client";

import CategorySearch from "@/components/categorySearch";
import ProductSearch from "@/components/productSearch";
import { ICategoryData, IProductData } from "@/types";
import { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";

interface IComposedCombinationsSelectorProps {
  composed: Array<
    Array<{
      category?: ICategoryData;
      product?: IProductData;
    }>
  >;
  setComposedCombinations: (
    value: Array<
      Array<{
        category?: ICategoryData;
        product?: IProductData;
      }>
    >
  ) => void;
}

const ComposedCombinationsSelector: React.FC<
  IComposedCombinationsSelectorProps
> = ({ composed, setComposedCombinations }) => {
  console.log(composed);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label className="font-bold">Combinations</label>
        <button
          className="text-green-500 hover:cursor-pointer disabled:text-zinc-600 disabled:cursor-default"
          onClick={(e) => {
            e.preventDefault();

            const newCombinations = composed != null ? composed?.slice() : [];

            newCombinations?.push([]);

            setComposedCombinations(newCombinations);
          }}
        >
          Add
        </button>
      </div>

      {composed.map((combination, index) => (
        <div key={`combination-${index}`}>
          <div className="flex flex-col gap-2 border border-zinc-800 rounded">
            <div className="grid grid-cols-11 gap-4 border-b border-zinc-800 pb-2 px-2 py-2 bg-zinc-700">
              <div className="font-bold border-r border-zinc-800 col-span-5">
                Category
              </div>
              <div className="font-bold col-span-5">Product</div>
              <div className="flex justify-end gap-2">
                <button
                  className="text-red-500 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();

                    const newCombinations = composed.filter(
                      (item, index2) => index2 !== index
                    );

                    setComposedCombinations(newCombinations);
                  }}
                >
                  <BiX />
                </button>
                <button
                  className="text-green-500 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();

                    const newCombinations = composed.slice();

                    newCombinations[index].push({});

                    setComposedCombinations(newCombinations);
                  }}
                >
                  <BiPlus />
                </button>
              </div>
            </div>
            {combination.map((value, combinationIndex) => (
              <div
                key={`${combinationIndex}-composed`}
                className="grid grid-cols-11 gap-4 px-2 py-2"
              >
                <div className="col-span-5">
                  {value.category != null ? (
                    <div className="bg-zinc-700 rounded px-4 py-2 flex items-center justify-between">
                      {value.category.label}

                      <button className="text-red-500 hover:cursor-pointer">
                        <BiX />
                      </button>
                    </div>
                  ) : (
                    <CategorySearch
                      onChange={(value) => {
                        const newValues = composed.slice();
                        newValues[index][combinationIndex] = {
                          category: value,
                          product: undefined,
                        };
                        setComposedCombinations(newValues);
                      }}
                    />
                  )}
                </div>

                <div className="col-span-5">
                  {value.category ? (
                    value.product ? (
                      <div className="bg-zinc-700 rounded px-4 py-2 flex items-center justify-between">
                        {value.product.label}

                        <button className="text-red-500 hover:cursor-pointer">
                          <BiX />
                        </button>
                      </div>
                    ) : (
                      <ProductSearch
                        category={value.category}
                        onChange={(product) => {
                          const newValues = composed.slice();
                          newValues[index][combinationIndex] = {
                            ...newValues[index][combinationIndex],
                            product: product,
                          };
                          setComposedCombinations(newValues);
                        }}
                      />
                    )
                  ) : null}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    className="text-red-500 hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();

                      const newCombinations = composed.slice();

                      const newCombination = newCombinations[index].filter(
                        (item, index2) => index2 !== combinationIndex
                      );

                      newCombinations[index] = newCombination;

                      setComposedCombinations(newCombinations);
                    }}
                  >
                    <BiX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComposedCombinationsSelector;
