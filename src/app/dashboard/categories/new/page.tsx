import NewCategoryForm from "../components/EditCategoryForm";

export default async function NewCategory() {
  return (
    <div className="flex flex-col h-full w-full">
      <NewCategoryForm />
    </div>
  );
}
