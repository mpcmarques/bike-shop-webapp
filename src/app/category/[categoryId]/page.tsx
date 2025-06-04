import { getCategoryProducts } from "@/app/actions/getCategoryProducts";
import Price from "@/components/price";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { categoryId } = await params;

  if (!categoryId) return null;

  const data = await getCategoryProducts(categoryId, {
    productType: "master",
  });

  if (data == null) {
    return null;
  }

  const { category, products } = data;

  return (
    <div className="w-full h-full p-6 gap-4 flex flex-col">
      <h1 className="text-2xl">{category.label}</h1>
      <h2 className="text-lg">{category.description}</h2>

      <div className="grid grid-cols-5 w-full gap-4">
        {products.map((product) => (
          <Link
            href={`/product/${product.name}`}
            key={product._id}
            className="border border-zinc-800 p-4 rounded bg-zinc-900 flex flex-col gap-4"
          >
            <div className="flex items-center justify-center w-full h-full">
              <div className="bg-gray-400 w-48 h-48 rounded-xl"></div>
            </div>

            <div className="text-xl font-bold">{product.label}</div>
            <div>
              {product.description.length > 100
                ? product.description.substring(0, 100) + "..."
                : product.description}
            </div>

            <Price product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
