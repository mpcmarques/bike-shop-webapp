import Link from "next/link";
import ProductsTable from "./components/ProductsTable";
import { getProducts } from "@/actions/getProducts";
import { BiPlus } from "react-icons/bi";
import ErrorCard from "@/components/ErrorCard";

export default async function Categories() {
  const { data, error } = await getProducts();

  if (error) {
    return <ErrorCard error={error} />;
  }

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="max-w-52">
        <Link href={`/dashboard/products/new`} className="btn-default text-sm">
          <BiPlus className="text-xl" /> New Product
        </Link>
      </div>

      {<ProductsTable products={data || []} />}
    </div>
  );
}
