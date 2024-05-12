"use client";
import React, { useEffect, useState } from "react";
import { GetLinks } from "../actions/GetLinks";
import Link from "next/link";
import copy from "copy-text-to-clipboard";
import { Button } from "@/components/ui/button";
import { CopyIcon, Trash } from "lucide-react";
import { ErrorToast, SuccessToast } from "./toast";
type Link = {
  id: number;
  name: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
};
export const revalidate = 3600;
export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const DeleteLink = async ({ id }: { id: string }) => {
    const res = await fetch(`/api/deletelink/${id}`, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        SuccessToast({ message: "Link deleted successfully!" });
        fetchLinks();
      } else {
        console.error("Error deleting link:", data.error);
        ErrorToast({ message: "Error deleting link!" });
        // Handle error state here if needed
      }
    }
  };
  const fetchLinks = async () => {
    try {
      const res: Link[] = await GetLinks(); // Type assertion is not needed
      setLinks(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching links:", error);
      // Handle error state here if needed
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="w-full overflow-y-hidden ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        links.map((link) => (
          <div
            key={link.id}
            className="w-full bg-accent mt-5 mb-5 p-5 flex flex-row items-start justify-between"
          >
            <div>
              {" "}
              <p className="font-semibold text-sans font-xl">{link.name}</p>
              <Link
                className="text-blue-500 underline underline-offset-1 cursor-pointer"
                href={link.originalUrl}
              >
                {link.originalUrl}
              </Link>
            </div>
            <div className="flex flex-row items-center gap-5">
              <Button
                size={"sm"}
                className=""
                onClick={() => {
                  copy(process.env.NEXT_PUBLIC_BASE_URL + link.shortUrl);
                  SuccessToast({ message: "Copied to clipboard!" });
                }}
              >
                <CopyIcon size={15} />
              </Button>
              <Button
                size={"sm"}
                className=""
                onClick={() => DeleteLink({ id: link.shortUrl })}
              >
                <Trash size={15} />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
