import React from "react";
import DirectLink from "./DirectLink";
import ListedLink from "./ListedLink";

type NavLinkProps = {
  isDirect: boolean;
  title: string;
  href?: string;
  isOpen: boolean;
  linkHandler: () => void;
};

const NavLink = ({
  isDirect,
  title,
  href,
  isOpen,
  linkHandler,
}: NavLinkProps) => {
  return isDirect ? (
    <DirectLink
      title={title}
      href={href as string}
      isOpen={isOpen}
      linkHandler={linkHandler}
    />
  ) : (
    <ListedLink title={title} isOpen={isOpen} linkHandler={linkHandler} />
  );
};

export default NavLink;
