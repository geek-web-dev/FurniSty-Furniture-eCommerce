"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { cleanNumberFormat, formatCurrency } from "../../../utils/formatters";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";
import { XSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import QuantityButtons from "./QuantityButtons";

import AddToTruckButton from "./AddToTruckButton";
import DeleteProductButton from "./DeleteProductButton";
import LoveButton from "./LoveButton";
import { getUltimatePrice } from "@/utils/getUltimatePrice";
import { useEffect, useState } from "react";
import { getProductSales } from "@/app/(customerFacing)/_actions/product";
import StarRating from "../../common/StarRating";
import { useAppContext } from "@/context/useAppContext";

type ProductItemProps = {
  id: string;
  name: string;
  category: string;
  priceInCents: number;
  offer: number;
  description?: string;
  imagePath: string;
  isVertical?: boolean;
  isWishlistItem?: boolean;
  quantityInStock: number;
  rate: number;
};

const ProductItem = ({
  id,
  name,
  category,
  priceInCents,
  offer,
  imagePath,
  quantityInStock,
  isVertical = true,
  isWishlistItem = false,
  rate,
}: ProductItemProps) => {
  const price = priceInCents / 100;

  const [salesCount, setSalesCount] = useState(0);
  const { user } = useAppContext();

  const getSalesCount = async () => {
    setSalesCount((await getProductSales(id)) ?? 0);
  };

  useEffect(() => {
    getSalesCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      className={cn(
        "flex overflow-hidden relative shadow-sm hover:shadow-lg duration-500 dark:border-[#333]",
        isVertical ? "flex-col" : "w-full rounded-none p-2 gap-2 items-center"
      )}
    >
      <div
        className={cn(
          "relative",
          isVertical ? "w-full h-auto aspect-video" : ""
        )}
      >
        {offer ? (
          <div
            className={cn(
              "absolute py-0.5 px-1.5 bg-[--badage-color] z-10 text-white font-semibold",
              isVertical
                ? "rounded-sm left-2 top-2"
                : "text-[12px] left-1 top-1"
            )}
          >
            offer {offer}%
          </div>
        ) : null}
        {user ? <LoveButton productId={id} isVertical={isVertical} /> : null}
        <Link href={`/shop/${category}/${id}`}>
          {isVertical ? (
            <Image
              src={imagePath}
              alt={name}
              fill
              sizes=""
              loading="lazy"
              title="Buy it Now"
            />
          ) : (
            <div className="relative w-[170px] h-[120px]">
              <Image
                src={imagePath}
                alt={name}
                objectFit="cover"
                layout="fill"
                loading="lazy"
                title="Buy it Now"
              />
            </div>
          )}
        </Link>
      </div>
      <div
        className={
          isVertical ? "" : "flex flex-col justify-between w-1/2 h-[120px]"
        }
      >
        <CardHeader className={isVertical ? "pb-0" : "p-0"}>
          <DeleteProductButton
            isVertical={isVertical}
            isWishlistItem={isWishlistItem}
            productId={id}
          />
          <CardTitle
            className={cn(
              "text-[--title-color] text-nowrap overflow-hidden overflow-ellipsis !mt-0",
              isVertical ? "" : "text-[16px] "
            )}
          >
            {name}
          </CardTitle>
          <CardDescription
            className={cn(
              "font-semibold relative my-1",
              isVertical ? "text-md" : "!mt-0"
            )}
          >
            <span className="text-[--sub-title]">
              {offer ? formatCurrency(price - (price / 100) * offer) : ""}
            </span>
            {offer ? " " : ""}
            <span
              className={cn(
                "text-[--sub-title]",
                offer ? "line-through opacity-25 " : "opacity-100"
              )}
            >
              {formatCurrency(price)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent
          className={cn("flex-grow mt-1", isVertical ? "p-0 px-6" : "p-0")}
        >
          <div
            className={cn(
              "flex text-blue-950 items-center",
              isVertical ? null : "text-[12px]"
            )}
          >
            <StarRating
              averageRate={rate}
              starWidth={isVertical ? "" : "w-3"}
            />
            <span className="font-semibold ml-1 text-slate-500 dark:text-slate-300">
              {rate}
            </span>
            <span className="ml-2 text-slate-500 dark:text-slate-100">
              ({cleanNumberFormat(salesCount)} sales)
            </span>
            {}
          </div>
        </CardContent>

        <CardFooter className={isVertical ? "mt-4" : "p-0  w-full"}>
          {isVertical || isWishlistItem ? (
            <AddToTruckButton
              isVertical={isVertical}
              isWishlistItem={isWishlistItem}
              productId={id}
              quantityInStock={quantityInStock}
              priceInCents={getUltimatePrice(priceInCents, offer)}
            />
          ) : !isWishlistItem && !isVertical ? (
            <QuantityButtons
              userId={user?.id as string}
              productId={id}
              priceInCents={priceInCents}
            />
          ) : null}
          <span
            className={cn(
              "text-[13px] font-semibold ",
              quantityInStock > 1
                ? "text-green-500"
                : quantityInStock
                ? "text-orange-500"
                : "text-red-500",
              isVertical ? "ml-auto" : "absolute right-3 text-[10px]"
            )}
          >
            {quantityInStock > 1
              ? "Available"
              : quantityInStock
              ? "Only 1 in stock"
              : "Not available"}
          </span>
        </CardFooter>
      </div>
    </Card>
  );
};

export const ProductItemSkeleton = ({
  isVertical = true,
}: {
  isVertical?: boolean;
}) => {
  return (
    <Card
      className={cn(
        "flex overflow-hidden animate-pulse relative border-[--line-color]",
        isVertical ? "flex-col" : "w-full rounded-none p-2 gap-2"
      )}
    >
      <div
        className={cn(
          "relative",
          isVertical ? "w-full h-auto aspect-video" : ""
        )}
      >
        <div
          className={cn(
            "absolute bg-gray-400 z-10 font-semibold",
            isVertical
              ? "rounded left-2 top-2 w-[85px] h-[28px]"
              : "text-[12px] left-1 top-1 w-[67px] h-[22px]"
          )}
        ></div>

        {isVertical ? (
          <div className="relative w-full h-auto bg-gray-300 aspect-video" />
        ) : (
          <div className="w-[196px] h-[112px] bg-gray-300 "></div>
        )}
      </div>
      <div className={isVertical ? "" : "flex flex-col"}>
        <CardHeader className={isVertical ? "" : "p-0"}>
          {isVertical ? null : (
            <XSquare className="text-gray-300 absolute right-2 top-2 !mt-0 cursor-pointe w-7 h-7 rounded-none" />
          )}
          <CardTitle className={isVertical ? "" : "!mt-0"}>
            <div className="w-3/4 h-6 bg-gray-300" />
          </CardTitle>
          <CardDescription
            className={cn(
              "font-semibold relative",
              isVertical ? "text-xl" : "!mt-0"
            )}
          >
            <span className="w-3/6 h-3 bg-gray-300 mt-2 block" />
            <span className="w-3/6 h-3 bg-gray-300 mt-2 block" />
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("flex-grow", isVertical ? "" : "p-0")}>
          <div></div>
        </CardContent>

        <CardFooter className={isVertical ? "" : "p-0"}>
          <Button
            className={cn(
              "bg-gray-500 rounded-none",
              isVertical ? "w-[174px] h-[44px]" : "w-[114px] h-[36px]"
            )}
            disabled
          ></Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductItem;
