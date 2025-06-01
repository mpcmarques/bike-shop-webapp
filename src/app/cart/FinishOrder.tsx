"use client";

import { useSession } from "next-auth/react";

const FinishOrder = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-xl">
        Total: ${session?.user?.cart.total.toFixed(2)}
      </div>
      <button
        className={`text-xl border border-cyan-400 bg-cyan-500 text-zinc-900 rounded px-4 py-2 cursor-pointer hover:bg-cyan-400 transition-colors disabled:pointer-events-none disabled:bg-zinc-600 disabled:border-zinc-500`}
      >
        Finish Order
      </button>
    </div>
  );
};

export default FinishOrder;
