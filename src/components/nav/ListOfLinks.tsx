import Link from "next/link";
import { categories, pages, productsLinks } from "@/config";

type LinksProps = { list: { name: string; href: string }[] };

const Links = ({ list }: LinksProps) => {
  return (
    <>
      {list.map((item) => (
        <Link
          // id="category-link"
          key={item.name}
          href={item.href}
          className="p-2 hover:bg-[--hover-color] duration-100"
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

const ListOfLinks = ({ underLink }: { underLink: string }) => {
  return (
    <div className="bg-white dark:bg-[#222] text-start p-2 w-[200px] absolute top-[52px] left-0 flex flex-col border-[--hover-color] border shadow-md">
      {underLink == "shop" ? (
        <Links list={categories} />
      ) : underLink == "pages" ? (
        <Links list={pages} />
      ) : (
        productsLinks.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="p-2 hover:bg-[--hover-color] duration-100 "
          >
            {link.title}
          </Link>
        ))
      )}
    </div>
  );
};

export default ListOfLinks;
