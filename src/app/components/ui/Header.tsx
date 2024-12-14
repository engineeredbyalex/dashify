"use client";
// importing Link for routing
import Link from "next/link";
// importing usePathname to match the pathname of the current address
// with the current link
import { usePathname } from "next/navigation";
// importing UserCard for the user sign out and other functions
import UserCard from "./UserCard";
// importing icons
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";

export default function Header() {
  const [toggle, setToggle] = useState(false);
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
    <div className="navigation_bar">
      <div className="w-full flex justify-between ">
        <UserCard />
        <HiBars3
          onClick={() => setToggle(!toggle)}
          className="fill-neutral-600 z-[11]"
          size={36}
        />
      </div>
      <div className={toggle ? "navigation_bar_toggled" : "none"}>
        <div className={toggle ? "navigation_bar_links" : "hidden"}>
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <h4
                className={
                  pathname === item.path
                    ? "header_link_active"
                    : "header_link_inactive"
                }
              >
                {item.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="navigation_bar">
  //     <div className="flex flex-row gap-16">
  //       <UserCard />
  // <div className="gap-4 hidden lg:flex flex-row items-center justify-center">
  //   {navItems.map((item) => (
  //     <Link href={item.path} key={item.name}>
  //       <h6
  //         className={
  //           pathname === item.path
  //             ? "header_link_active"
  //             : "header_link_inactive"
  //         }
  //       >
  //         {item.name}
  //       </h6>
  //     </Link>
  //   ))}
  // </div>
  //     </div>

  //     <div className="gap-4 hidden lg:flex items-center justify-center">
  //       <HiChatBubbleOvalLeft
  //         className="fill-neutral-600 hover:fill-neutral-300 animation cursor-pointer"
  //         size={20}
  //       />
  //       <HiBell
  //         className="fill-neutral-600 hover:fill-neutral-300 animation cursor-pointer"
  //         size={20}
  //       />
  //       <input placeholder="Search for"></input>
  //     </div>
  //   </div>
  // );
}
