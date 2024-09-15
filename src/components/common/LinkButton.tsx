import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const LinkButton = ({ href, title }: { href: string; title: string }) => {
  return (
    <Button
      className="bg-[--btn-color] hover:bg-[--btn-hover-color] !text-white "
      asChild
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
};

export default LinkButton;
