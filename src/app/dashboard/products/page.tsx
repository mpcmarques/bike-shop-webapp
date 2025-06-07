import Link from "next/link";
import ProductsTable from "./components/ProductsTable";
import { getProducts } from "@/app/actions/getProducts";

export default async function Categories() {
  const products = await getProducts({ limit: 30, skip: 0 });

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="flex gap-2">
        <Link href={`/dashboard/products/new`}>Create New Product</Link>
      </div>

      <ProductsTable products={products || []} />
    </div>
  );
}
