"use client";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import ListOfLinks from "./ListOfLinks";

type ListedLinkProps = {
  title: string;
  isOpen: boolean;
  linkHandler: () => void;
};

const ListedLink = ({ title, isOpen, linkHandler }: ListedLinkProps) => {
  return (
    <Button
      className="gap-1.5 relative hover:bg-[--hover-color] "
      onMouseOver={linkHandler}
      variant={isOpen ? "secondary" : "ghost"}
    >
      <span
        className={cn(
          isOpen ? "dark:text-white text-black" : "text-[--sub-title]",
          " group-hover:dark:text-white group-hover:text-black "
        )}
      >
        {title}
      </span>
      <ChevronUp
        className={cn(
          "h-4 w-4 transition-all text-muted-foreground dark:text-[#666]",
          {
            "rotate-180": !isOpen,
          }
        )}
      />
      {isOpen ? <ListOfLinks underLink={title.toLowerCase()} /> : null}
    </Button>
  );
};

export default ListedLink;
