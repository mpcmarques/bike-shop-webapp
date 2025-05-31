import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full">
      <ul className="flex flex-col gap-2 bg-zinc-700 px-6 py-5 rounded">
        <Link href="/dashboard/categories">Categories</Link>
        <Link href="/dashboard/products">Products</Link>
      </ul>

      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
