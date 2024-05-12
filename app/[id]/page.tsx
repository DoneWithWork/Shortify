"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
export default function ReRoute({ params }: { params: { id: string } }) {
  const router = useRouter();
  useEffect(() => {
    const fetchLink = async () => {
      const data = await fetch(`/api/getlink/${params.id}`);
      console.log(data);
      const link = await data.json();
      console.log(data);
      if (link.error) {
        router.push("/404");
      } else {
        const originalUrl = link.original;
        if (!originalUrl) {
          router.push("/404");
        }
        console.log(originalUrl);
        router.push(originalUrl);
      }
    };
    fetchLink();
  });
}
