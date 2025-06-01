import { IProductData } from "@/types";

const Price = ({ product }: { product: IProductData }) => {
  return (
    <div className="flex gap-4">
      {product.salesPrice !== product.listPrice ? (
        <>
          <div className="text-green-700">${product.salesPrice.toFixed(2)}</div>

          <div className="line-through text-zinc-500">
            ${product.listPrice.toFixed(2)}
          </div>
        </>
      ) : (
        <div className="font-bold">${product.salesPrice.toFixed(2)}</div>
      )}
    </div>
  );
};

export default Price;
