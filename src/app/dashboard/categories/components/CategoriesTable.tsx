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
            <th className="text-left">Id</th>
            <th className="text-left">Label</th>
            <th>Show in menu</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="bg-zinc-800">
          {categoriesData.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.label}</td>

              <td>
                <div className="flex justify-center text-center w-full">
                  {category.showInMenu ? "Yes" : "No"}
                </div>
              </td>

              <td>
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
