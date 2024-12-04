"use client";
import Link from "next/link";
import BreadCrumbs from "./Breadcrumbs";
import { usePathname } from "next/navigation";

// Define a type for the props


export default function PageHeader({ children }: any) {
  const pathName = usePathname();

  // Function to clean and format the pathName
  const getCleanedPathname = () => {
    if (pathName === "/") {
      return "Dashboard"; // Special case for the root path
    }
    return pathName
      .substring(1) // Remove the leading "/"
      .split("/") // Split into individual segments
      .map(
        (segment) => segment.charAt(0).toUpperCase() + segment.slice(1) // Capitalize each segment
      );
  };

  return (
    <div className="w-full h-auto flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="text-neutral-50 w-full">
        <h1>{getCleanedPathname()}</h1>
        <div>
          <BreadCrumbs />
        </div>
      </div>
      <div className="gap-2 flex w-full flex-row">{children}</div>
    </div>
  );
}
