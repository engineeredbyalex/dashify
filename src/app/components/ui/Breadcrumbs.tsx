"use client";

// Importing usePathname to get the current path of the page
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
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
      )
      .join(" > "); // Join segments with a separator
  };

  return (
    <div className="flex gap-2">
      <p>{getCleanedPathname()}</p>
    </div>
  );
}
