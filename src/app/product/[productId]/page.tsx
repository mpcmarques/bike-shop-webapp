"use server";

import { getProduct } from "@/app/actions/getProduct";
import AddToCartButton from "@/components/addToCartButton";
import Price from "@/components/price";

export default async function Product({ params }) {
  const { productId } = await params;

  if (!productId) return null;

  const product = await getProduct(productId);

  if (product == null) {
    return null;
  }

  return (
    <div className="p-8 h-full w-full">
      <div className="grid grid-cols-2">
        <div className="bg-gray-500 w-64 h-64"></div>
        <div className="border-zinc-800 bg-zinc-900 border p-6 rounded flex flex-col">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl font-bold">{product.label}</h1>
            <h2 className="text-xl">{product.description}</h2>

            <h2 className="text-xl">{product.stock}</h2>
          </div>

          <div className="w-full flex flex-col gap-4">
            <Price product={product} />
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
