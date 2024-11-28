"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define a generic type for the wrapped component's props
type WithAuthProps<P = {}> = P & {
  // You can add any additional props here if needed
};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent = (props: P) => {
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
  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;
