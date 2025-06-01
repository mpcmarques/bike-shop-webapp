"use client";

import Price from "@/components/price";
import RemoveFromCartButton from "@/components/removeFromCartButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ItemsList = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {session?.user?.cart.items.map((item, index) => (
        <div
          key={item._id + index}
          className="bg-zinc-800 p-2 flex gap-4 rounded justify-between"
        >
          <div className="flex gap-4">
            <div className="bg-gray-500 w-12 h-12"></div>
            <div>
              <Link href={`/product/${item.name}`}>{item.label}</Link>
              <Price product={item} />
            </div>
          </div>

          <RemoveFromCartButton product={item} />
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
