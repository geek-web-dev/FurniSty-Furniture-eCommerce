"use client";
import React, { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { categories, links, pages } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-clikc-outside";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import MenuButton from "./MenuButton";

const RenderNestedLinksInMobile = ({ linkName }: { linkName: string }) => {
  if (linkName == "shop") {
    return categories.map((cat, i) => (
      <Button
        key={i}
        asChild
        variant="ghost"
        className="w-full hover:bg-[--hover-color] rounded-none"
      >
        <Link href={cat.href as string}>{cat.name}</Link>
      </Button>
    ));
  } else if (linkName == "pages") {
    return pages.map((p, i) => (
      <Button
        key={i}
        asChild
        variant="ghost"
        className="w-full hover:bg-[--hover-color] rounded-none"
      >
        <Link href={p.href as string}>{p.name}</Link>
      </Button>
    ));
  }
  return <></>;
};

const NavItems = () => {
  // for decktop nav
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    const scrollCheck = () => {
      if (window.scrollY > 45) setIsScrollDown(true);
      else setIsScrollDown(false);
    };

    window.addEventListener("scroll", scrollCheck);
    return () => {
      window.removeEventListener("scroll", scrollCheck);
    };
  });

  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  // for mobile nav
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  // useOnClickOutside(mobileNavRef, () => setIsOpen(false));

  return (
    <>
      <div
        className="hidden md:flex gap-0.5 md:mr-auto lg:ml-8 ml-0 font-semibold"
        // id="menu_oo"
        ref={navRef}
      >
        {links.map((link, i) => {
          const linkHandler = () => setActiveIndex(i);

          return (
            <NavLink
              isDirect={link.isDirectLink}
              key={link.title}
              title={link.title}
              href={link.href}
              isOpen={i === activeIndex}
              linkHandler={linkHandler}
            />
          );
        })}
      </div>

      <MenuButton open={open} setOpen={setOpen} />

      <Accordion
        type="single"
        collapsible
        ref={mobileNavRef}
        className={cn(
          "w-[250px] fixed h-full duration-150 bg-white dark:bg-[#1f1f1f] border border-[--line-color]",
          open ? "left-0" : "-left-[250px]",
          isScrollDown ? "top-[63px]" : "top-[108px]"
        )}
      >
        {links.map((link, i) => (
          <AccordionItem key={i} value={"Sd" + i}>
            {link.isDirectLink ? (
              <Button
                asChild
                className="w-full hover:bg-[--hover-color] rounded-none"
                variant="ghost"
              >
                <Link href={link.href as string} className="!block">
                  {link.title}
                </Link>
              </Button>
            ) : (
              <>
                <AccordionTrigger className="py-2 w-full hover:bg-[--hover-color]">
                  <span className="ml-4">{link.title}</span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  <RenderNestedLinksInMobile
                    linkName={link.title.toLowerCase()}
                  />
                </AccordionContent>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default NavItems;
