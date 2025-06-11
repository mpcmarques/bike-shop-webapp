import { getCategories } from "@/app/actions/getCategories";
import EditProductForm from "../components/EditProductForm";
import ErrorCard from "@/components/ErrorCard";

export default async function NewProduct() {
  const categories = await getCategories();

  if (!Array.isArray(categories) && categories.error) {
    return <ErrorCard error={categories.error} />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <h2>Create New Product</h2>

      {Array.isArray(categories) && <EditProductForm categories={categories} />}
    </div>
  );
}
