"use client";

import Link from "next/link";
import ThemeToggle from "@/lib/ThemeToggle";
import { useState } from "react";

export default function Page() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={` ${ isDark ? " text-white bg-black " : " text-black bg-white" }  h-full  flex flex-col items-center justify-center `}>
      <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <p className="text-[108px]">404</p>
      <div className="flex flex-col items-center justify-center gap-6">
        <p>Page doesn&lsquo;t exist...</p>

        <Link
          href={"/"}
          className={` ${ isDark ? " hover:decoration-white " : "hover:decoration-black" } gap-6 text-left underline decoration-transparent transition-all duration-300 ease-in-out`}
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
