"use client";

import ProductSearch from "@/components/productSearch";
import { IProductData } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { BiCheck, BiEdit } from "react-icons/bi";

interface IProductsTableProps {
  products: IProductData[];
}

const ProductsTable: React.FC<IProductsTableProps> = ({ products }) => {
  const [productsData, setProductsData] = useState(products);

  const onChange = () => {};

  console.log(productsData);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2>Search</h2>
        <ProductSearch onChange={onChange} />
      </div>

      <table className="table-auto rounded">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Label</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="bg-zinc-800">
          {productsData.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.label}</td>

              <td className="flex justify-center text-center">
                {product.productType}
              </td>
              <td className="text-center">{product.stock}</td>
              <td className="flex justify-center text-center">
                <Link href={`/dashboard/products/edit/${product.name}`}>
                  <BiEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
