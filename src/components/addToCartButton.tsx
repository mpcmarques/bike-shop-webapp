"use client";

import { addToCart } from "@/app/actions/addToCart";
import { IProductData } from "@/types";
import { useSession } from "next-auth/react";
import { ButtonHTMLAttributes, DetailedHTMLProps, useTransition } from "react";

interface IAddToCartButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  product: IProductData;
}

const AddToCartButton: React.FC<IAddToCartButton> = ({
  product,
  ...others
}) => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart(product);
      await update();
    });
  };

  return (
    <button
      disabled={product.stock <= 0 || isPending}
      className={`text-xl border border-cyan-400 bg-cyan-500 text-zinc-900 rounded px-4 py-2 cursor-pointer hover:bg-cyan-400 transition-colors disabled:pointer-events-none disabled:bg-zinc-600 disabled:border-zinc-500`}
      {...others}
      onClick={handleAddToCart}
    >
      {product.stock <= 0
        ? "Out of Stock"
        : isPending
        ? "Adding to Cart..."
        : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
