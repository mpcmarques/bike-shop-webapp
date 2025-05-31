import { getCategories } from "@/app/actions/getCategories";
import NewCategoryForm from "./components/NewProductForm";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col h-full w-full">
      <h2>Create New Product</h2>

      <NewCategoryForm categories={categories} />
    </div>
  );
}
