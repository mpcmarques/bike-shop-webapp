import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";
import ItemsList from "./itemsList";
import FinishOrder from "./FinishOrder";

export default async function Cart() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl">Cart</h1>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 grid grid-cols-1 gap-2">
          <ItemsList />
        </div>
        <div className="col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded flex flex-col gap-4">
            <FinishOrder />
          </div>
        </div>
      </div>
    </div>
  );
}
