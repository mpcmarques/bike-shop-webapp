"use server";

import { getProduct } from "@/app/actions/getProduct";
import AddToCartButton from "@/components/addToCartButton";
import Price from "@/components/price";
import {
  IComposedProductData,
  IProductData,
  IProductDataWithVariants,
} from "@/types";
import VariantSelector from "./VariantSelector";
import ComposedProductDetails from "./ComposedProductDetails";

const ProductWithVariantDetails = ({
  product,
  currentVariant,
}: {
  product: IProductDataWithVariants;
  currentVariant?: IProductData;
}) => {
  const selectedVariant =
    currentVariant ||
    product.variants
      .sort((a, b) => (a.salesPrice < b.salesPrice ? -1 : 1))
      .at(0);

  if (selectedVariant)
    return (
      <>
        <VariantSelector
          masterProduct={product}
          selectedVariant={selectedVariant}
        />
        <h2 className="text-xl">Stock: {selectedVariant.stock}</h2>
        <Price product={selectedVariant} />
        <AddToCartButton product={selectedVariant} />
      </>
    );

  return <></>;
};

const ProductDetails = ({ product }: { product: IProductDataWithVariants }) => {
  if (product.productType === "composed") {
    return <ComposedProductDetails product={product as IComposedProductData} />;
  }

  if (product.productType === "master" && product.variants.length > 0) {
    return <ProductWithVariantDetails product={product} />;
  } else if (
    product.masterProduct &&
    product.masterProduct.variants?.length > 0
  ) {
    return (
      <ProductWithVariantDetails
        product={product.masterProduct}
        currentVariant={product}
      />
    );
  }

  return (
    <>
      <h2 className="text-xl">Stock: {product.stock}</h2>
      <Price product={product} />
      <AddToCartButton product={product} />
    </>
  );
};

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
          </div>

          <div className="w-full flex flex-col gap-4">
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
