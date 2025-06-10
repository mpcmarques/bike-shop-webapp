import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-6 h-full w-full p-8 gap-4 pt-22">
      <ul className="flex flex-col gap-2 bg-zinc-800 px-6 py-5 rounded col-span-1 border border-zinc-700">
        <Link href="/dashboard/categories">Categories</Link>
        <Link href="/dashboard/products">Products</Link>
      </ul>

      <div className="p-4 w-full col-span-5 bg-zinc-900 rounded border border-zinc-800">
        {children}
      </div>
    </div>
  );
}
