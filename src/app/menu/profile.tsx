"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex gap-4 items-center">
      {session ? (
        <>
          <Link
            href="/cart"
            className="flex flex-col items-center justify-center"
          >
            <span>Cart</span>
            <span>{session?.user?.cart?.items.length}</span>
          </Link>
          <Link href="/dashboard">Dashboard</Link>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default Profile;
