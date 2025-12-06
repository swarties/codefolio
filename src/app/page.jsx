"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/lib/ThemeToggle";
import { Button } from "@/components/ui/button";

function Dot({ isDark }) {
  return (
    <div
      className={`p-1.5 rounded-lg border ${isDark ? "border-violet-800 bg-violet-800" : "border-violet-800 bg-violet-800"}`}
    />
  );
}

function RedirectSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="inline -translate-y-0.5"
    >
      <defs>
        <linearGradient id="redirectGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <path
        fill="url(#redirectGradient)"
        fillRule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h-2a.5.5 0 0 1 0-1h2z"
      />
      <path
        fill="url(#redirectGradient)"
        fillRule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
      />
    </svg>
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

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            Your GitHub Portfolio, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-violet-600">
              Simplified.
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${subTextClass}`}
          >
            A clean and minimalistic platform where developers can showcase
            their work. Link your{" "}
            <Link
              href="https://github.com/"
              className="relative inline-block group"
            >
              <span className=" inline text-transparent bg-clip-text bg-linear-to-r from-violet-700 to-violet-800">
                GitHub <RedirectSVG />
              </span>

              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-px h-0.5 w-full bg-linear-to-r from-violet-700 to-violet-800 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              />
            </Link>{" "}
            account, generate a profile page, and share your code with the
            world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/authentication" className="w-full sm:w-auto">
              <Button
                className={`w-full sm:w-auto h-12 px-8 text-lg bg-linear-to-r from-violet-700 to-violet-800 ${isDark ? " text-black hover:text-white" : " text-white hover:text-black"}`}
              >
                Create your Profile
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className={`w-full sm:w-auto h-12 px-8 text-lg border ${borderClass} ${isDark ? "border-white bg-black text-violet-600 hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"}`}
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 border-t ${borderClass} text-center`}>
        <p className={`text-sm ${subTextClass}`}>
          © {new Date().getFullYear()} Codefolio. Built with Next.js &
          Tailwind.
        </p>
      </footer>
    </div>
  );
}
