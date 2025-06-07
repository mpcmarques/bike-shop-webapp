import { getCategories } from "@/app/actions/getCategories";
import NewProductForm from "../../components/EditProductForm";
import { getProduct } from "@/app/actions/getProduct";
import { IProductData } from "@/types";

export default async function EditProduct({ params }) {
  const categories = await getCategories();

  const { productName } = await params;

  const product = await getProduct(productName);

  return (
    <div className="flex flex-col h-full w-full">
      <h2>Edit Product</h2>

      <NewProductForm
        categories={categories}
        product={product as IProductData}
      />
    </div>
  );
}
