import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="relative hidden lg:block">
      <Link
        href="/"
        className="font-bold relative text-black dark:text-white z-10"
        style={{ letterSpacing: "2px" }}
      >
        <span className="text-xl">F</span>U<span className=" font-mono">R</span>
        NI
        <span className="text-lg text-blue-500/50">S</span>T
        <span className="text-sm">Y</span>
        <span className="text-[12px]">L</span>
        <span className="text-[8px]">E</span>
      </Link>
      <div className="bg-blue-500/15 w-5 h-5 rounded-full absolute left-[-7px] top-4 -translate-y-[50%] z-0"></div>
      <div className="bg-blue-400/15 w-10 h-10 rounded-full absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-0"></div>
      <div className="bg-blue-500/15 w-5 h-5 rounded-full absolute -right-1 top-4 -translate-y-[50%] z-0"></div>
    </div>
  );
};

export default Logo;
