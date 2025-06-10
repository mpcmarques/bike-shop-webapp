"use client";

import ProductSearch from "@/components/productSearch";
import { ICategoryData } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

interface IProductsTableProps {
  categories: ICategoryData[];
}

const CategoriesTable: React.FC<IProductsTableProps> = ({ categories }) => {
  const [categoriesData, setCategoriesData] = useState(categories);

  const onChange = () => {};

  return (
    <div className="flex flex-col gap-4">
      <table className="table-auto rounded">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 bg-slate-950">Id</th>
            <th className="text-left px-4 py-2 bg-slate-950">Label</th>
            <th className="px-4 py-2 bg-slate-950">Show in menu</th>
            <th className="px-4 py-2 bg-slate-950">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categoriesData.map((category) => (
            <tr key={category._id} className="border-b border-b-zinc-700">
              <td className="px-4 py-2 bg-slate-800 border-l border-l-zinc-700 border-r border-r-zinc-700">
                {category.name}
              </td>
              <td className="px-4 py-2 bg-slate-900 border-r border-r-zinc-700">
                {category.label}
              </td>

              <td className="px-4 py-2 bg-slate-800 border-r border-r-zinc-700">
                <div className="flex justify-center text-center w-full">
                  {category.showInMenu ? "Yes" : "No"}
                </div>
              </td>

              <td className="px-4 py-2 bg-slate-900 border-r border-r-zinc-700">
                <div className="flex justify-center text-center w-full">
                  <Link href={`/dashboard/categories/edit/${category.name}`}>
                    <BiEdit />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
