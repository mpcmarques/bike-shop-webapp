import NewCategoryForm from "./components/NewCategoryForm";

export default async function Categories() {
  return (
    <div className="flex flex-col h-full w-full">
      <h2>Create New Category</h2>

      <NewCategoryForm />
    </div>
  );
}
