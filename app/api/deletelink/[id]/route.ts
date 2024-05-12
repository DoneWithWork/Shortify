import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const link = await prisma.links.delete({
    where: {
      shortUrl: id,
    },
  });
  console.log(link);
  if (!link) {
    console.log("Error in finding shortUrl");
    // If the link doesn't exist, return a 404 Not Found response
    return Response.json(
      { error: "Error in finding shortUrl" },
      {
        status: 404,
      }
    );
  } else {
    // If the link exists, return the shortUrl in the response
    return Response.json(
      { success: "Link deleted" },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
