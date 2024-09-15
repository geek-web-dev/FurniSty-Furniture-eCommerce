"use client";
import GridList from "@/components/common/GridList";
import Heading from "@/components/common/Heading";
import ProductItem, {
  ProductItemSkeleton,
} from "@/components/ecommerce/product/ProductItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useTransition } from "react";

import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { Label } from "@/components/ui/label";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [isPending, startTransition] = useTransition();

  const [priceRange, setPriceRange] = useState("9999");
  const [rateRange, setRateRange] = useState("0");
  const [availability, setAvailability] = useState("-1"); // -1=all 0=not_available 1=available

  const getProducts = async () => {
    setProducts(null);
    const response = await fetch(
      `/api/products?price_range=${priceRange}&rate_range=${rateRange}&availability=${availability}`
    );
    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
    } else {
      setProducts(null);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heading title="Shop" location="/ shop" />
      <div className="my-8 border-b border-[--line-color] pb-8">
        <h2 className="text-xl mb-4">Filter</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price</Label>
            <Select defaultValue="9999" onValueChange={(v) => setPriceRange(v)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="9999">All</SelectItem>
                  <SelectItem value="100">Less than $100</SelectItem>
                  <SelectItem value="200">Less than $200</SelectItem>
                  <SelectItem value="300">Less than $300</SelectItem>
                  <SelectItem value="400">Less than $400</SelectItem>
                  <SelectItem value="500">Less than $500</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <Select defaultValue="0" onValueChange={(v) => setRateRange(v)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a rate range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">All</SelectItem>
                  <SelectItem value="1">more than 1 star</SelectItem>
                  <SelectItem value="2">more than 2 stars</SelectItem>
                  <SelectItem value="3">more than 3 stars</SelectItem>
                  <SelectItem value="4">more than 4 stars</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Availability</Label>
            <Select defaultValue="0" onValueChange={(v) => setAvailability(v)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select an availability of products" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">All</SelectItem>
                  <SelectItem value="1">Available Products</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          className="bg-[--btn-color-2] hover:bg-[--btn-hover-color-2] text-white mt-4"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await getProducts();
            })
          }
        >
          {isPending ? <BeatLoader size={12} color="white" /> : "Filteration"}
        </Button>
      </div>
      <GridList
        records={products}
        renderItem={(item) => <ProductItem key={item.id} {...item} />}
        SkeletonComponent={ProductItemSkeleton}
      />
    </>
  );
};

export default ShopPage;
