"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/favicon.ico";
import { usePathname } from "next/navigation";

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
    <div className="w-screen h-auto px-8 py-4 border-neutral-800 border-b-[1px] flex items-center justify-between">
      <div>
        <Image src={Logo} alt="logo" className="w-8 h-8" />
      </div>
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
      <div>
        <input
          placeholder="Search for"
          className="px-2 py-1 border border-neutral-700 rounded"
        />
      </div>
    </div>
  );
}
