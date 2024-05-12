import React from "react";
import Navbar from "./_components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <section className="p-10 text-center mt-10">
          <h1 className="text-6xl font-bold font-sans">Shortify</h1>
          <p className="text-xl mt-5 mb-5 text-blue-500 font-semibold font-mono">
            Making long links shorter, one link at a time.
          </p>
          <Link href={"/sign-up"} className={buttonVariants()}>
            Get Started
            <ArrowRight className="ml-2 " size={20} />
          </Link>
        </section>
      </div>
    </div>
  );
}
