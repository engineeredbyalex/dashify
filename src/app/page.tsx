"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-neutral-50 rounded text-neutral-50"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return <span className="text-neutral-50 text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link href="/login">
          <button className="button_primary">Sign In</button>
        </Link>
      );
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl text-neutral-50">Home</h1>
      {showSession()}
    </main>
  );
}
