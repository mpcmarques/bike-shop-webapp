import { getCategories } from "@/app/actions/getCategories";
import EditProductForm from "../components/EditProductForm";
import ErrorCard from "@/components/ErrorCard";

export default async function NewProduct() {
  const { data, error } = await getCategories();

  if (error) {
    return <ErrorCard error={error} />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <h2>Create New Product</h2>

      <EditProductForm categories={data || []} />
    </div>
  );
}
