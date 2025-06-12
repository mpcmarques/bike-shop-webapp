"use client";

import { addToCart } from "@/actions/addToCart";
import Price from "@/components/price";
import { ICategoryData, IComposedProductData, IProductData } from "@/types";
import { useSession } from "next-auth/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { BiCartAdd } from "react-icons/bi";

interface IComposedProductDetailsProps {
  product: IComposedProductData;
}

const ComposedProductDetails: React.FC<IComposedProductDetailsProps> = ({
  product,
}) => {
  const composed = product.composed;
  const [possibleCombinations, setPossibleCombinations] = useState(composed);
  const [selectedProducts, setSelectedProducts] = useState<IProductData[]>([]);
  const [price, setPrice] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const handleAddToCart = useCallback(
    (selectedProducts: IProductData[]) => {
      startTransition(async () => {
        await addToCart(product, 1, selectedProducts);
        await update();
      });
    },
    [product, update],
  );

  const flatComposedArray = useMemo(() => [...composed.flat()], [composed]);

  const uniqueCategories = useMemo(
    () =>
      flatComposedArray
        .slice()
        .sort((a, b) =>
          !a.category || !b.category
            ? 0
            : a.category?.name < b.category?.name
              ? -1
              : 1,
        )
        .filter((item, pos, ary) => {
          return !pos || item.category?.name !== ary[pos - 1].category?.name;
        })
        .map((data) => {
          return data.category;
        }),
    [flatComposedArray],
  );

  const uniqueProducts = useMemo(
    () =>
      flatComposedArray
        .slice()
        .sort((a, b) =>
          !a.product || !b.product
            ? 0
            : a.product?.name < b.product?.name
              ? -1
              : 1,
        )
        .filter((item, pos, ary) => {
          return !pos || item.product?.name !== ary[pos - 1].product?.name;
        })
        .map((data) => {
          return data.product;
        }),
    [flatComposedArray],
  );

  useEffect(() => {
    if (selectedProducts.length === 0) {
      setPrice(0);
      return;
    }

    let price = 0;

    selectedProducts.forEach((product) => {
      price += product.salesPrice;
    });

    setPrice(price);
  }, [selectedProducts]);

  const handleClick = useCallback(
    (
      variant: IProductData,
      isAlreadySelected: boolean,
      possibleCombinations: {
        product: IProductData;
        category: ICategoryData;
      }[][],
      selectedProducts: IProductData[],
      composed: {
        product: IProductData;
        category: ICategoryData;
      }[][],
    ) => {
      if (isAlreadySelected) {
        const newSelectedProducts = selectedProducts
          .slice()
          .filter((selectedProduct) => selectedProduct._id !== variant._id);

        let newPossibleCombinations = composed.slice();

        newSelectedProducts.forEach((selectedProduct) => {
          newPossibleCombinations = newPossibleCombinations.filter((value) =>
            value.find(
              (data) => data.product._id === selectedProduct.masterProduct?._id,
            ),
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
            (productInComb) =>
              productInComb.product._id === variant.masterProduct?._id,
          );
        });

      setPossibleCombinations(newPossibleCombinations);
      setSelectedProducts([...selectedProducts, variant]);
    },
    [],
  );

  const isCombinationPossible = useCallback(
    (
      product: IProductData,
      possibleCombinations: {
        product: IProductData;
        category: ICategoryData;
      }[][],
      selectedProducts: IProductData[],
    ) => {
      const alreadySelectedProductFromSameMaster =
        selectedProducts.find(
          (selectedProduct) =>
            selectedProduct.masterProduct?._id === product.masterProduct?._id &&
            selectedProduct._id !== product._id,
        ) != null;

      if (alreadySelectedProductFromSameMaster) return false;

      const combination = possibleCombinations.find((combination) =>
        combination.find(
          (comb) => comb.product._id === product.masterProduct?._id,
        ),
      );

      return combination != null;
    },
    [],
  );

  const renderButton = useCallback(
    (variant: IProductData, selectedProducts: IProductData[]) => {
      const isAlreadySelected =
        selectedProducts.find(
          (selectedProduct) => selectedProduct._id === variant._id,
        ) != null;

      return (
        <button
          key={`${variant?._id}`}
          className={`${
            isAlreadySelected
              ? "bg-zinc-500 hover:bg-zinc-600"
              : "hover:bg-zinc-800"
          } flex flex-col gap-1 text-zinc-200 border-zinc-500 border px-4 py-2 rounded hover:cursor-pointer  transition-colors disabled:border-zinc-800 disabled:pointer-events-none disabled:text-zinc-800`}
          onClick={() => {
            handleClick(
              variant,
              isAlreadySelected,
              possibleCombinations,
              selectedProducts,
              composed,
            );
          }}
          disabled={
            variant.stock == 0 ||
            !isCombinationPossible(
              variant,
              possibleCombinations,
              selectedProducts,
            )
          }
        >
          <span>{variant?.label}</span>
          <span className="text-sm">
            {variant.stock === 0 ? (
              <span className="text-sm text-red-950 font-bold">
                Out of Stock
              </span>
            ) : (
              <Price product={variant} />
            )}
          </span>
        </button>
      );
    },
    [handleClick, isCombinationPossible, possibleCombinations, composed],
  );

  const checkIsDisabled = useCallback(() => {
    if (possibleCombinations.length != 1) return true;

    const filtered = possibleCombinations
      .slice()[0]
      .filter((comb) =>
        selectedProducts.find(
          (selectedProduct) =>
            comb.product._id === selectedProduct.masterProduct?._id,
        ),
      );

    return filtered.length !== possibleCombinations[0].length;
  }, [selectedProducts, possibleCombinations]);

  return (
    <div className="flex flex-col gap-4">
      {uniqueCategories.map((category) => (
        <div key={category?._id} className="flex flex-col gap-2">
          <div className="text-xl font-bold">{category?.label}</div>

          <div className="grid grid-cols-5 gap-4">
            {uniqueProducts
              .filter((a) => a?.category === category?._id)
              .map((product) =>
                product.variants?.map((variant) =>
                  renderButton(variant, selectedProducts),
                ),
              )}
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <div className="font-bold">${price.toFixed(2)}</div>
      </div>

      <button
        className="btn-default"
        disabled={isPending || checkIsDisabled()}
        onClick={() => handleAddToCart(selectedProducts)}
      >
        {isPending ? (
          <span>Adding to Cart...</span>
        ) : (
          <>
            <BiCartAdd />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ComposedProductDetails;
