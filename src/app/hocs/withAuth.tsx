"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Wait for session to load
      if (status === "unauthenticated") {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>Loading...</div>; // Optional loading state
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
