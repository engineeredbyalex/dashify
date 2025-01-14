"use client";

import BreadCrumbs from "./breadcrumb";
import { usePathname } from "next/navigation";

// Define a type for the props
interface PageHeaderProps {
  children?: React.ReactNode; // Specify that children can be any valid React node
}

export default function PageHeader({ children }: PageHeaderProps) {
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
    <div className="w-full h-auto flex flex-col lg:flex-row items-center justify-between  truncate">
      <div className="text-neutral-50 w-full lg:w-1/2 flex flex-col items-start justify-center">
        <h1>{getCleanedPathname()}</h1>
        <BreadCrumbs />
      </div>
      <div className=" w-full lg:w-1/2 gap-4 mt-4 flex flex-row items-center justify-between lg:justify-end">
        {children}
      </div>
    </div>
  );
}
