import React from "react";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { LinkForm } from "../_components/Form";
import Links from "../_components/Links";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="p-5  w-full max-h-screen">
      <h1 className="font-bold text-2xl font-sans mb-5">Dashboard</h1>
      <p className="mb-10 text-3xl font-mono font-semibold">
        Welcome <span className="text-blue-600 ">{user?.fullName}</span>
      </p>

      <Links />
    </div>
  );
}
