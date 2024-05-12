import { buttonVariants } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="w-full p-5 bg-accent border-b-2 shadow-lg flex flex-row items-center justify-between">
      <Link href={"/"} className="font-bold text-2xl">
        Shortify
      </Link>
      {user ? (
        <Link href={"/dashboard"} className={buttonVariants()}>
          Dashboard
        </Link>
      ) : (
        <div className="items-center gap-5 flex">
          <Link href={"/sign-in"} className={buttonVariants({})}>
            Sign In
          </Link>
          <Link href={"/sign-up"} className={buttonVariants({})}>
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
