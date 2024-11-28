"use client";
// importing Link for routing
import Link from "next/link";
// importing usePathname to match the pathname of the current address
// with the current link
import { usePathname } from "next/navigation";
// importing UserCard for the user sign out and other functions
import UserCard from "./UserCard";
// importing icons
import { HiBell } from "react-icons/hi2";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Statistics", path: "/statistics" },
    { name: "Clients", path: "/clients" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-screen h-auto px-28 py-8 border-neutral-800 border-b-[1px] flex items-center justify-between">
      <div className="flex flex-row gap-16">
        <UserCard />
        <div className="gap-4 flex flex-row items-center justify-center">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <h6
                className={
                  pathname === item.path
                    ? "header_link_active"
                    : "header_link_inactive"
                }
              >
                {item.name}
              </h6>
            </Link>
          ))}
        </div>
      </div>

      <div className="gap-4 flex items-center justify-center">
        <HiChatBubbleOvalLeft className="fill-neutral-600" size={20} />
        <HiBell className="fill-neutral-600" size={20} />
        <input placeholder="Search for"></input>
      </div>
    </div>
  );
}
