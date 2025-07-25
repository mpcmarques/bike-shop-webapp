import { getCategory } from "@/actions/getCategory";
import EditCategoryForm from "../../components/EditCategoryForm";

export default async function EditCategory({ params }) {
  const { categoryName } = await params;

  const { data } = await getCategory(categoryName);

  return (
    <div className="flex flex-col h-full w-full">
      <EditCategoryForm category={data} />
    </div>
  );
}
