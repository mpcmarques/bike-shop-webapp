"use server";

import Link from "next/link";
import Profile from "./profile";
import { BiSolidHome } from "react-icons/bi";
import { getMenuCategories } from "../../actions/getMenuCategories";
import ErrorCard from "@/components/ErrorCard";
import { ICategoryData } from "@/types";

export default async function Menu() {
  const { error, data } = await getMenuCategories();

  if (error) {
    return <ErrorCard error={error} />;
  }

  return (
    <div className="w-full px-8 pt-4 z-10">
      <div className="border border-zinc-800 w-full flex gap-4 px-4 py-2 rounded-2xl bg-zinc-900 justify-between items-center">
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-xl hover:text-blue-300 transition-colors"
          >
            <BiSolidHome className="text-2xl" />
          </Link>
          {(data as ICategoryData[]).map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.name}`}
              className="text-xl hover:text-blue-300 transition-colors"
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
