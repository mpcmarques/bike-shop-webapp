"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Menu = () => {
  const { data: session } = useSession();

  return (
    <div className="border border-red-300 w-full flex gap-4">
      <Link href="/cart">Cart</Link>

      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default Menu;
