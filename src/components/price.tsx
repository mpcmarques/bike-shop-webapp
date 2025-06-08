import { calculateCartProductPrice } from "@/app/lib/productPriceHelper";
import { IProductData } from "@/types";
import { useMemo } from "react";

const Price = ({
  product,
  quantity = 1,
  combination,
}: {
  product: IProductData;
  quantity?: number;
  combination?: IProductData[];
}) => {
  const price = useMemo(
    () => calculateCartProductPrice(product, quantity, combination),
    [product, quantity, combination],
  );

  return (
    <div className="flex gap-4">
      {product.salesPrice !== product.listPrice ? (
        <>
          <div className="text-green-700">${price.toFixed(2)}</div>

          <div className="line-through text-zinc-500">
            ${product.listPrice.toFixed(2)}
          </div>
        </>
      ) : (
        <div className="font-bold">${price.toFixed(2)}</div>
      )}
    </div>
  );
};

export default Price;
