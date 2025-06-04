"use client";

import React from "react";

interface IVariationAttributeSelectorProps {
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
}

const VariationAttributeSelector: React.FC<
  IVariationAttributeSelectorProps
> = ({ variationAttributes, setVariationAttributes }) => {
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

export default VariationAttributeSelector;
