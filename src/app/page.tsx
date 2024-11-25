"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./components/ui/Header";
import Loader from "./components/ui/Loader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Loader />
      </main>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
}
