import { getCategories } from "@/app/actions/getCategories";
import EditProductForm from "../components/EditProductForm";

export default async function NewProduct() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col h-full w-full">
      <h2>Create New Product</h2>

      <EditProductForm categories={categories} />
    </div>
  );
}
