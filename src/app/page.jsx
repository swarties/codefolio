"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/lib/ThemeToggle";
import { Button } from "@/components/ui/button";

function Dot({isDark}) {
  return (
    <div
      className={`p-1.5 rounded-lg border ${isDark ? "border-white bg-white" : "border-black bg-black"}`}
    />
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  const themeClasses = isDark ? "bg-black text-white" : "bg-white text-black";
  const borderClass = isDark ? "border-white/20" : "border-black/20";
  const subTextClass = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClasses}`}
    >
      {/* Navigation */}
      <nav
        className={`w-full p-6 flex items-center justify-between border-b ${borderClass}`}
      >
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2 select-none">
          <Dot isDark={isDark} />
          <Dot isDark={isDark} />
          <Dot isDark={isDark} />
          Codefolio
        </div>

        <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        <div className="group flex items-center gap-4">
          <Link href="/authentication">
            <Button
              variant="outline"
              className={`${isDark ? "bg-black text-white hover:bg-white hover:text-black" : "bg-white text-black hover:bg-black hover:text-white"} border font-medium`}
            >
              Log In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className={`${isDark ? "bg-white text-black group-hover:bg-black group-hover:text-white" : "bg-black text-white hover:bg-black hover:text-white group-hover:bg-white group-hover:text-black"} border font-medium `}
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
