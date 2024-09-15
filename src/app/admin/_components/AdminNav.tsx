"use client";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import VerticalLine from "@/components/common/VerticalLine";
import NavLink from "@/components/nav/NavLink";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-clikc-outside";
import { User2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useRef, useState } from "react";

const ThemeButton = dynamic(
  () => import("../../../components/common/ThemeButton"),
  { ssr: false }
);

const AdminNav = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="sticky z-50 top-0 inset-x-0 bg-background" ref={navRef}>
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-[--line-color]">
            <div className="flex items-center gap-1 flex-wrap min-h-16">
              {/* TODO: mobile nav */}
              {adminLinks.map((link, i) => {
                const linkHandler = () => setActiveIndex(i);
                return (
                  <NavLink
                    key={i}
                    isDirect={link.isDirectLink}
                    href={link.href}
                    isOpen={activeIndex == i}
                    linkHandler={linkHandler}
                    title={link.title}
                  />
                );
              })}
              <div className="ml-auto flex justify-between items-center">
                <User2 className="opacity-50 hover:opacity-100 hover:scale-[1.05] duration-100" />
                {/* <Image
                  src={user.image}
                  fill
                  alt="user"
                  className="absolute rounded-full hover:scale-110 duration-75"
                /> */}
                <VerticalLine />
                <ThemeButton className="" isCoverd={true} />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default AdminNav;
