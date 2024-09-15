"use client";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import SearchDialog from "./SearchDialog";
import { cn } from "@/lib/utils";
import VerticalLine from "../common/VerticalLine";
import { LogOut, Settings, UserCog2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Wishlist from "../ecommerce/wishlist/Wishlist";
import dynamic from "next/dynamic";
import ShoppingTruck from "../ecommerce/shoppingTruck/ShoppingTruck";
import Logo from "./Logo";

const ThemeButton = dynamic(() => import("../common/ThemeButton"), {
  ssr: false,
});

const Navbar = () => {
  const user = {};

  return (
    <>
      <div
        className={cn(
          "bg-[#333] dark:bg-[#111] py-3 select-none z-50 relative"
        )}
      >
        <MaxWidthWrapper>
          <div className="flex items-center justify-end text-[14px]">
            <ThemeButton className="mr-auto" />
            {user == null ? (
              <Link
                href="/auth/log-in"
                className="text-white/75 hover:text-white duration-100"
              >
                Log in
              </Link>
            ) : null}

            {user == null ? <VerticalLine color="bg-white/15" /> : null}

            {user == null ? (
              <Link
                href="/auth/sign-up"
                className="text-white/75 hover:text-white duration-100"
              >
                Sign up
              </Link>
            ) : null}

            {user != null ? (
              <span className=" text-white/75 hover:text-white duration-100 cursor-pointer">
                Sign out
              </span>
            ) : null}
          </div>
        </MaxWidthWrapper>
      </div>
      <div className="sticky z-50 top-0 inset-x-0 h-16 bg-background">
        <header className={cn("relative bg-background")}>
          <MaxWidthWrapper>
            <div className={"border-b border-[--line-color]"}>
              <div className="flex h-16 items-center justify-between">
                <Logo />

                <NavItems />

                <div className="flex items-center">
                  <div className="flex items-center justify-end">
                    {user == null ? null : (
                      <>
                        <div className="w-[36px] h-[36px] flex items-center justify-center relative">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Image
                                src={"/avatar.png"}
                                fill
                                alt="user"
                                className="absolute rounded-full hover:scale-110 duration-75"
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-7 font-semibold bg-white dark:bg-[#222]">
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer "
                              >
                                <Link
                                  href="/profile"
                                  className="hover:!bg-[--hover-color]"
                                >
                                  Profile
                                  <UserCog2 className="w-4 ml-auto" />
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer hover:bg-[--hover-color]"
                              >
                                <Link
                                  href="/pages/settings"
                                  className="hover:!bg-[--hover-color]"
                                >
                                  Settings
                                  <Settings className="w-4 ml-auto" />
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                // prevent the action
                                // onClick={() => signOut()}
                                className="cursor-pointer hover:!bg-[--hover-color]"
                              >
                                Logout
                                <LogOut className="w-4 ml-auto" />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <VerticalLine />
                      </>
                    )}

                    <SearchDialog />
                    {user ? (
                      <>
                        <VerticalLine />
                        <Wishlist />
                      </>
                    ) : null}

                    {user ? (
                      <>
                        <VerticalLine />
                        <ShoppingTruck />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    </>
  );
};

export default Navbar;
