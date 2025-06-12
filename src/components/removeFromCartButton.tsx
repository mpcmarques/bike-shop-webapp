"use client";

import { removeFromCart } from "@/actions/removeFromCart";
import { IProductData } from "@/types";
import { useSession } from "next-auth/react";
import { ButtonHTMLAttributes, DetailedHTMLProps, useTransition } from "react";
import { BiX } from "react-icons/bi";

interface IRemoveFromCartButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  product: IProductData;
}

const RemoveFromCartButton: React.FC<IRemoveFromCartButton> = ({
  product,
  ...others
}) => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const handleRemoveFromCart = () => {
    startTransition(async () => {
      await removeFromCart(product);
      await update();
    });
  };

  return (
    <button
      disabled={isPending}
      className={`text-xl text-red-500 hover:text-red-400 rounded px-4 py-2 cursor-pointer  transition-colors disabled:pointer-events-none disabled:text-zinc-600 `}
      {...others}
      onClick={handleRemoveFromCart}
    >
      <BiX />
    </button>
  );
};

export default RemoveFromCartButton;
