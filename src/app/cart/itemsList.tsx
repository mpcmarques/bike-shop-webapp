"use client";

import Price from "@/components/price";
import RemoveFromCartButton from "@/components/removeFromCartButton";
import { IUserData } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ItemsList = () => {
  const { data: session } = useSession();

  const user = session?.user as IUserData;

  return (
    <div className="w-full flex flex-col gap-2">
      {user?.cart.items.length > 0 ? (
        user?.cart.items.map((item, index) => (
          <div
            key={item.product._id + index}
            className="bg-zinc-800 grid grid-cols-16 p-4"
          >
            <div className="bg-gray-500 w-12 h-12 col-span-1 relative">
              <Image
                fill={true}
                src={`${item.product.image ? item.product.image : "https://picsum.photos/200"}`}
                alt={item.product.label}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-5 justify-center col-span-12">
              <div>
                <Link href={`/product/${item.product.name}`}>
                  {item.product.label}
                </Link>
              </div>
              {item.combination ? (
                <div className="grid grid-cols-7 gap-2">
                  {item.combination.map((combinationItem) => (
                    <div
                      key={combinationItem._id}
                      className="p-2 border border-zinc-700 rounded text-xs"
                    >
                      <div>{combinationItem.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="col-span-2 flex justify-end items-center">
              <Price
                product={item.product}
                quantity={item.quantity}
                combination={item.combination}
              />
            </div>

            <div className="flex justify-end items-center">
              <RemoveFromCartButton product={item.product} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-xl px-4 py-2 bg-zinc-800 rounded">
          No products so far
        </div>
      )}
    </div>
  );
};

export default ItemsList;
