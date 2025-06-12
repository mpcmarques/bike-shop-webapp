import { getCategories } from "@/app/actions/getCategories";
import EditProductForm from "../../components/EditProductForm";
import { getProduct } from "@/app/actions/getProduct";
import { IProductData } from "@/types";

export default async function EditProduct({ params }) {
  const { productName } = await params;

  const getCategoriesResult = await getCategories();

  const getProductResult = await getProduct(productName);

  return (
    <div className="flex flex-col h-full w-full">
      <h2>Edit Product</h2>

      <EditProductForm
        categories={getCategoriesResult.data || []}
        product={getProductResult.data as IProductData}
      />
    </div>
  );
}
