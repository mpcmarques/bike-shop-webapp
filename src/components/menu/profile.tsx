"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { IUserData } from "@/types";
import { BiCart, BiLogIn, BiLogOut } from "react-icons/bi";
import { useMemo } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user as IUserData;

  const isAdmin = useMemo(
    () => (user ? user.roles.includes("admin") : false),
    [user],
  );

  return (
    <div className="w-full flex gap-4 items-center">
      <>
        <Link
          href="/cart"
          className="flex gap-2 items-center justify-center text-xl border border-zinc-500 px-4 py-2 rounded hover:text-blue-300 hover:border-blue-300 transition-colors"
        >
          <BiCart className="text-2xl" />
          <span>{user ? user.cart.items.length : 0}</span>
        </Link>
        {session ? (
          <>
            Signed in as {session.user?.email} <br />
            {isAdmin ? (
              <Link
                href="/dashboard"
                className=" hover:text-blue-300 transition-colors cursor-pointer"
              >
                Dashboard
              </Link>
            ) : null}
            <button
              onClick={() => signOut()}
              className="flex gap-2 items-center justify-center text-xl cursor-pointer px-4 py-2 pr-6 rounded bg-zinc-600 border-zinc-400 hover:bg-zinc-400 text-zinc-100 transition-colors"
            >
              <BiLogOut />
              <span className="text-sm">Sign Out</span>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex gap-2 items-center justify-center text-xl  px-4 py-2 pr-6 rounded bg-cyan-500 border-cyan-400 hover:bg-cyan-300 text-zinc-900 transition-colors"
          >
            <BiLogIn className="text-2xl" />
            Login
          </Link>
        )}
      </>
    </div>
  );
};

export default Profile;
