"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex gap-2">
      <Link href="/cart">Cart</Link>

      {session ? (
        <>
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
