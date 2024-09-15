import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4 md:justify-start  justify-center">
      <Link href={""}>
        <Facebook className="w-5" />
      </Link>
      <Link href={""}>
        <Instagram className="w-5" />
      </Link>
      <Link href={""}>
        <Twitter className="w-5" />
      </Link>
      <Link href={""}>
        <Linkedin className="w-5" />
      </Link>
    </div>
  );
};

export default SocialLinks;
