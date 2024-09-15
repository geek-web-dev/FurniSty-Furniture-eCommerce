import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const FooterLink = ({
  name,
  href,
  margin = "mt-2",
}: {
  name: string;
  href: string;
  margin?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(" hover:underline flex items-center group ", margin)}
    >
      {name}
      <ArrowLeft
        size={16}
        className={cn(
          "ml-6 opacity-0",
          "group-hover:ml-1 group-hover:opacity-100 duration-150"
        )}
      />
    </Link>
  );
};

export default FooterLink;
