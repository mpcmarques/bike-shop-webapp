import Link from "next/link";
import { getCategories } from "@/app/actions/getCategories";
import CategoriesTable from "./components/CategoriesTable";
import { BiPlus } from "react-icons/bi";
import ErrorCard from "@/components/ErrorCard";

export default async function Categories() {
  const { error, data } = await getCategories();

  if (error) {
    return <ErrorCard error={error} />;
  }

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="max-w-52">
        <Link
          href={`/dashboard/categories/new`}
          className="btn-default text-sm"
        >
          <BiPlus className="text-xl" /> New Category
        </Link>
      </div>

      <CategoriesTable categories={data || []} />
    </div>
  );
}
