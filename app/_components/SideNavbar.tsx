import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LinkRoutes from "./LinkRoutes";

export default async function SideNavbar() {
  const user = await currentUser();

  return (
    <nav className="w-[250px]  bg-accent h-screen mr-5">
      <div className="w-full p-5 flex flex-col justify-between h-screen ">
        <h1>Shortify</h1>
        <LinkRoutes />
        <div>{user ? <UserButton afterSignOutUrl="/" showName /> : null}</div>
      </div>
    </nav>
  );
}
