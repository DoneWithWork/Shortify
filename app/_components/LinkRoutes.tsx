"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Link2 } from "lucide-react";
const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "New Link",
    href: "/dashboard/newlink",
    icon: Link2,
  },
];

export default function LinkRoutes() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-left gap-5">
      {links.map((link) => (
        <Link
          key={link.href}
          className={cn(
            link.href === pathname
              ? "font-bold text-black bg-black"
              : "font-thin",
            `flex items-center gap-2  ${buttonVariants()}`
          )}
          href={link.href}
        >
          <link.icon size={20} />
          {link.name}
        </Link>
      ))}
    </div>
  );
}
