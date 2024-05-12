"use server";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { formSchema } from "../_components/FormSchema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
export const CreateLink = async (values: z.infer<typeof formSchema>) => {
  const user = await currentUser();
  const result = formSchema.safeParse(values);
  if (result.success == false) {
    return { error: result.error.formErrors.fieldErrors };
  }
  if (!user) {
    redirect("/sign-in");
  }
  const data = result.data;
  const link = await prisma.links.create({
    data: {
      name: data.name,
      originalUrl: data.originalUrl,
      shortUrl: nanoid(), // Call the nanoid() function here
      userId: user.id,
    },
  });
  if (!link) {
    return { error: "Failed to create link" };
  }
  revalidatePath("/dashboard");
  return { success: "Link created successfully" };
};
