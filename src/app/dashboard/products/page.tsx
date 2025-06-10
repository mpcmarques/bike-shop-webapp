import Link from "next/link";
import ProductsTable from "./components/ProductsTable";
import { getProducts } from "@/app/actions/getProducts";
import { BiPlus } from "react-icons/bi";

export default async function Categories() {
  const products = await getProducts({ limit: 30, skip: 0 });

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="max-w-52">
        <Link href={`/dashboard/products/new`} className="btn-default text-sm">
          <BiPlus className="text-xl" /> New Product
        </Link>
      </div>

      <ProductsTable products={products || []} />
    </div>
  );
}
