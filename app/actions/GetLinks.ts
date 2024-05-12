"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const GetLinks = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  const data = await prisma.links.findMany({
    where: {
      userId: user.id,
    },
  });
  if (!data) {
    return [];
  } else {
    return data;
  }
};
