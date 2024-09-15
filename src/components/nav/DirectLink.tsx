"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type NavItemProps = {
  title: string;
  href: string;
  isOpen: boolean;
  linkHandler: () => void;
};

const DirectLink = ({ title, href, isOpen, linkHandler }: NavItemProps) => {
  return (
    <Button
      className="bg-none hover:bg-[--hover-color] group"
      variant={isOpen ? "secondary" : "ghost"}
      onClick={linkHandler}
      asChild
    >
      <Link href={href}>
        {/* {title} */}
        <span
          className={cn(
            isOpen ? "dark:text-white text-black" : "text-[--sub-title]",
            " group-hover:dark:text-white group-hover:text-black "
          )}
        >
          {title}
        </span>
      </Link>
    </Button>
  );
};

export default DirectLink;
