"use client";

import ProductSearch from "@/components/productSearch";
import { IProductData } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiEdit } from "react-icons/bi";

interface IProductsTableProps {
  products: IProductData[];
}

const ProductsTable: React.FC<IProductsTableProps> = ({ products }) => {
  const onChange = (product: IProductData) => {
    return redirect(`/dashboard/products/edit/${product.name}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>Search</h2>
        <ProductSearch onChange={onChange} />
      </div>

      <table className="table-auto rounded">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 bg-slate-950">Id</th>
            <th className="text-left px-4 py-2 bg-slate-950">Label</th>
            <th className="px-4 py-2 bg-slate-950">Type</th>
            <th className="px-4 py-2 bg-slate-950">Stock</th>
            <th className="px-4 py-2 bg-slate-950">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-b-zinc-700">
              <td className="px-4 py-2 bg-slate-800 border-l border-l-zinc-700 border-r border-r-zinc-700">
                {product.name}
              </td>
              <td className="px-4 py-2 bg-slate-900 border-r border-r-zinc-700">
                {product.label}
              </td>

              <td className="flex justify-center text-center px-4 py-2 bg-slate-800 border-r border-r-zinc-700">
                {product.productType}
              </td>
              <td className="text-center px-4 py-2 bg-slate-900 border-r border-r-zinc-700">
                {product.stock}
              </td>
              <td className=" bg-slate-800 border-r border-r-zinc-700">
                <div className="flex justify-center text-center w-full">
                  <Link href={`/dashboard/products/edit/${product.name}`}>
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

export default ProductsTable;
