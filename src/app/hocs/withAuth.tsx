"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define the type for the wrapped component's props
type WithAuthProps = {
  [key: string]: any; // You can replace this with a more specific type if known
};

const withAuth = (WrappedComponent: React.ComponentType<WithAuthProps>) => {
  const AuthenticatedComponent = (props: WithAuthProps) => {
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

  // Set a display name for the wrapped component
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
