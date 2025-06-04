"use client";

import CategorySearch from "@/components/categorySearch";
import ProductSearch from "@/components/productSearch";
import { ICategoryData, IProductData } from "@/types";
import { useState } from "react";

interface IComposedCombinationsSelectorProps {
  composed?: Array<{
    category: ICategoryData;
    products: IProductData[];
  }>;
  setVariationAttributes: (
    value: Array<{
      category: ICategoryData;
      products: IProductData[];
    }>
  ) => void;
}

const ComposedCombinationsSelector: React.FC<
  IComposedCombinationsSelectorProps
> = ({ composed, setVariationAttributes }) => {
  const [category, setCategory] = useState<ICategoryData>();

  const [values, setValues] = useState<any>(
    composed || [{ category: null, products: [] }]
  );

  return (
    <div>
      {values.map((value, index) => (
        <div key={`${index}-composed`}>
          <CategorySearch
            onChange={(value) => {
              const newValues = values.slice();
              newValues[index] = value;
              setValues(newValues);
            }}
          />
          {/* <ProductSearch /> */}
        </div>
      ))}
    </div>
  );
};

export default ComposedCombinationsSelector;
