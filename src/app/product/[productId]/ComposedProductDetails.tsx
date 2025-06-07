"use client";

import AddToCartButton from "@/components/addToCartButton";
import Price from "@/components/price";
import { ICategoryData, IComposedProductData, IProductData } from "@/types";
import { useCallback, useMemo, useState } from "react";

interface IComposedProductDetailsProps {
  product: IComposedProductData;
}

const ComposedProductDetails: React.FC<IComposedProductDetailsProps> = ({
  product,
}) => {
  const composed = product.composed;
  const [possibleCombinations, setPossibleCombinations] = useState(composed);
  const [selectedProducts, setSelectedProducts] = useState<IProductData[]>([]);

  const flatComposedArray = [...composed.flat()];

  const uniqueCategories = flatComposedArray
    .slice()
    .sort((a, b) =>
      !a.category || !b.category
        ? 0
        : a.category?.name < b.category?.name
        ? -1
        : 1
    )
    .filter((item, pos, ary) => {
      return !pos || item.category?.name !== ary[pos - 1].category?.name;
    })
    .map((data) => {
      return data.category;
    });

  const uniqueProducts = flatComposedArray
    .slice()
    .sort((a, b) =>
      !a.product || !b.product ? 0 : a.product?.name < b.product?.name ? -1 : 1
    )
    .filter((item, pos, ary) => {
      return !pos || item.product?.name !== ary[pos - 1].product?.name;
    })
    .map((data) => {
      return data.product;
    });

  const handleClick = useCallback(
    (
      product: IProductData,
      isAlreadySelected: boolean,
      possibleCombinations: {
        product: IProductData;
        category: ICategoryData;
      }[][],
      selectedProducts: IProductData[],
      composed: {
        product: IProductData;
        category: ICategoryData;
      }[][]
    ) => {
      if (isAlreadySelected) {
        const newSelectedProducts = selectedProducts
          .slice()
          .filter((selectedProduct) => selectedProduct._id !== product._id);

        let newPossibleCombinations = composed.slice();

        newSelectedProducts.forEach((selectedProduct) => {
          newPossibleCombinations = newPossibleCombinations.filter((value) =>
            value.find((data) => data.product._id === selectedProduct._id)
          );
        });

        setPossibleCombinations(newPossibleCombinations);
        setSelectedProducts(newSelectedProducts);
        return;
      }

      const newPossibleCombinations = possibleCombinations
        .slice()
        .filter((combination) => {
          return combination.find(
            (productInComb) => productInComb.product._id === product._id
          );
        });

      setPossibleCombinations(newPossibleCombinations);
      setSelectedProducts([...selectedProducts, product]);
    },
    []
  );

  const isCombinationPossible = useCallback(
    (
      product: IProductData,
      possibleCombinations: {
        product: IProductData;
        category: ICategoryData;
      }[][]
    ) => {
      const combination = possibleCombinations.find((combination) =>
        combination.find((comb) => comb.product._id === product._id)
      );

      return combination != null;
    },
    []
  );

  const renderButton = useCallback(
    (product: IProductData, selectedProducts: IProductData[]) => {
      const isAlreadySelected =
        selectedProducts.find(
          (selectedProduct) => selectedProduct._id === product._id
        ) != null;

      return (
        <button
          key={`${product?._id}`}
          className={`${
            isAlreadySelected
              ? "bg-zinc-500 hover:bg-zinc-600"
              : "hover:bg-zinc-800"
          } flex flex-col gap-1 text-zinc-200 border-zinc-500 border px-4 py-2 rounded hover:cursor-pointer  transition-colors disabled:border-zinc-800 disabled:pointer-events-none disabled:text-zinc-800`}
          onClick={() => {
            handleClick(
              product,
              isAlreadySelected,
              possibleCombinations,
              selectedProducts,
              composed
            );
          }}
          disabled={
            product.stock == 0 ||
            !isCombinationPossible(product, possibleCombinations)
          }
        >
          <span>{product?.label}</span>
          <span className="text-sm text-red-950 font-bold">
            {product.stock === 0 ? "Out of Stock" : null}
          </span>
        </button>
      );
    },
    [handleClick, isCombinationPossible, possibleCombinations, composed]
  );

  console.log(uniqueProducts);

  return (
    <div className="flex flex-col gap-4">
      {uniqueCategories.map((category) => (
        <div key={category?._id} className="flex flex-col gap-2">
          <div className="text-xl font-bold">{category?.label}</div>

          <div className="flex gap-4">
            {uniqueProducts
              .filter((a) => a?.category === category?._id)
              .map((product) => renderButton(product, selectedProducts))}
          </div>
        </div>
      ))}

      <Price product={product} />
      <AddToCartButton product={product} />
    </div>
  );
};

export default ComposedProductDetails;
