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
      <div className="flex items-center justify-evenly gap-5">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-neutral-50"></div>
          <p>
            {session?.user?.name
              ? `Hello, ${session.user.name}!`
              : "No name found"}
          </p>
        </div>
        <HiChevronDown
          onClick={() => setToggle(!toggle)}
          size={16}
          className="fill-neutral-600 cursor-pointer"
        />
      </div>

      {/* Dropdown Content */}
      {toggle && (
        <div className="user_card_toggled">
          <Link href={"/user_settings"}>
            <p className="cursor-pointer">Settings</p>
          </Link>
          <Link href={"/support"}>
            <p className="cursor-pointer">Support</p>
          </Link>
          <p className="cursor-pointer" onClick={() => signOut()}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
}
