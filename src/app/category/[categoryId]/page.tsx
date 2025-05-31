import { getCategory } from "@/app/actions/getCategory";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { categoryId } = await params;

  const category = await getCategory(categoryId);

  if (category == null) {
    return null;
  }

  console.log(category);

  return (
    <div className="w-full h-full p-6 gap-4 flex flex-col">
      <h1 className="text-2xl">{category.label}</h1>
      <h2 className="text-lg">{category.description}</h2>

      <div className="grid grid-cols-5 w-full gap-4">
        {category.products.map((product) => (
          <Link
            href={`/products/${product.name}`}
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

            <div className="flex gap-2">
              {product.salesPrice !== product.listPrice ? (
                <>
                  <div className="text-green-700">
                    ${product.salesPrice.toFixed(2)}
                  </div>

                  <div className="line-through text-zinc-500">
                    ${product.listPrice.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="font-bold">
                  ${product.salesPrice.toFixed(2)}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
