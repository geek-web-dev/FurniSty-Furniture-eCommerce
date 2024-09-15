"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import GridList from "../common/GridList";
import ProductItem, {
  ProductItemSkeleton,
} from "../ecommerce/product/ProductItem";
import { Product } from "@prisma/client";
import Image from "next/image";

const SearchDialog = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[] | null>([]);

  const handleSearch = async () => {
    if (query != "") {
      setResults(null);
      const response = await fetch(`/api/search?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data?.products);
      } else {
        setResults(null);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <Dialog>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogTrigger className="group">
          <Image
            src={"/icons/search.png"}
            width={30}
            height={30}
            alt=""
            className="group-hover:scale-110 duration-75"
            loading="lazy"
          />
        </DialogTrigger>
        <DialogContent className="lg:max-w-[1000px] flex flex-col h-[500px]">
          <h3>Search on Furnitures</h3>
          <DialogHeader className="mt-10">
            <Input
              id="name"
              placeholder="Search"
              className="col-span-3 rounded-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </DialogHeader>
          <div className="overflow-y-auto max-h-[400px] pb-8">
            {/* {loading ? (
              "loading.."
            ) : ( */}
            <GridList
              records={results}
              renderItem={(item) => (
                <ProductItem
                  key={item.id}
                  isVertical={false}
                  {...item}
                  isWishlistItem={true}
                />
              )}
              className=" lg:grid-cols-2 "
            />
            {/* )} */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
