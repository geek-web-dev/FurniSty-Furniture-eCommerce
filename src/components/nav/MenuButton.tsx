"use client";
import { cn } from "@/lib/utils";

const MenuButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="relative h-4 w-8 cursor-pointer md:hidden"
      onClick={() => setOpen((p) => !p)}
    >
      <div
        className={cn(
          "absolute h-[2px] w-full bg-black dark:bg-white left-0 top-0 duration-500",
          open ? "rotate-45 translate-y-2" : ""
        )}
      ></div>
      <div
        className={cn(
          "absolute h-[2px] w-full bg-black dark:bg-white left-0 top-2 duration-500",
          open ? "-translate-x-8 opacity-0" : "opacity-100"
        )}
      ></div>
      <div
        className={cn(
          "absolute h-[2px] w-full bg-black dark:bg-white left-0 top-4 duration-500",
          open ? "-rotate-45 -translate-y-2" : ""
        )}
      ></div>
    </div>
  );
};

export default MenuButton;
