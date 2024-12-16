"use client";
import { useSession } from "next-auth/react";
import { HiChevronDown } from "react-icons/hi2";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserCard() {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative user_card">
      <div
        onClick={() => setToggle(!toggle)}
        className="flex items-center justify-evenly gap-5"
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="w-4 h-4 rounded-full bg-neutral-50"></div>
          <h6>
            {session?.user?.name
              ? `Hello, ${session.user.name}!`
              : "No name found"}
          </h6>
        </div>
        <HiChevronDown size={16} className="fill-neutral-600 cursor-pointer" />
      </div>

      {/* Dropdown Content */}
      {toggle && (
        <div className="user_card_toggled">
          <Link href={"/user_settings"}>
            <h6 className="cursor-pointer">Settings</h6>
          </Link>
          <Link href={"/support"}>
            <h6 className="cursor-pointer">Support</h6>
          </Link>
          <h6 className="cursor-pointer" onClick={() => signOut()}>
            Sign out
          </h6>
        </div>
      )}
    </div>
  );
}
