"use server";

import Link from "next/link";
import { getCategories } from "../actions/getCategories";
import Profile from "./profile";

export default async function Menu() {
  const categories = await getCategories();

  return (
    <div className="w-full px-8 pt-4">
      <div className="border border-zinc-800 w-full flex gap-4 px-4 py-2 rounded-2xl bg-zinc-900 justify-between items-center">
        <div className="flex gap-2">
          <Link href="/" className="text-xl">
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.name}`}
              className="text-xl"
            >
              {category.label}
            </Link>
          ))}
        </div>

        <div className="flex">
          <Profile />
        </div>
      </div>
    </div>
  );
}
