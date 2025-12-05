"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import ThemeToggle from "@/lib/ThemeToggle";
import { useState } from "react";

export default function Loading() {
  const isDark = true;

  return (
    <div className={` ${isDark ? " text-white bg-black " : " text-black bg-white"} h-full `}>
    <div
      className={` ${isDark ? " text-white bg-black " : " text-black bg-white"} h-full flex flex-col items-center justify-center`}
    >
      <Ring size="50" stroke="6" bgOpacity="0" speed="1" color="white" />
    </div>
    </div>
  );
}
