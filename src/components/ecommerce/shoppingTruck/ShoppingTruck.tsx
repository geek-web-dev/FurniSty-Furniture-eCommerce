import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useEffect, useState, useTransition } from "react";
import { getProductsInTruckByUserId } from "@/app/(customerFacing)/_actions/product";
import GridList from "@/components/common/GridList";
import ProductItem, { ProductItemSkeleton } from "../product/ProductItem";

import { cn } from "@/lib/utils";
import styles from "../../../app/styles.module.css";
import {
  deleteAllItemsFromTruck,
  getCartItemsQauntity,
  getCartItemsTotalPrice,
} from "@/app/(customerFacing)/_actions/shoppingTruck";
import { BeatLoader } from "react-spinners";
import { useAppContext } from "@/context/useAppContext";
import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { user } from "@/config";
const { pump } = styles;

const ShoppingTruck = () => {
  const fee = 1;
  const [totalPriceInCents, setTotalPriceInCents] = useState<number | null>(0);
  const { truckItems, setTruckItems, totalQuantity, setTotalQuantity } =
    useAppContext();

  const [isDeleteAllPending, startDeleteAll] = useTransition();

  const getItems = async () => {
    if (user) {
      const items = await getProductsInTruckByUserId(user?.id as string);
      if (items == null) return;
      setTruckItems(items);
      const getTotalQuantity = await getCartItemsQauntity(user?.id as string);

      if (!getTotalQuantity) {
        console.log("you can't get total q");
      } else {
        setTotalQuantity(getTotalQuantity);
      }
      setTotalPriceInCents(await getCartItemsTotalPrice(user.id as string));
    }
  };

  // works only once
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalQuantity]);

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center relative group">
        <Image
          src={"/icons/3d-truck.png"}
          width={30}
          height={30}
          alt=""
          className="group-hover:scale-110 duration-75 "
          loading="lazy"
        />
        {totalQuantity ? (
          <span
            className={cn(
              "text-sm font-medium text-white bg-blue-600 rounded-full w-[22px] h-[22px] flex items-center justify-center absolute -top-3 -left-2",
              pump
            )}
          >
            {totalQuantity}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6 flex mt-4">
          <div className="flex justify-between items-end">
            <div className="text-start">
              <SheetTitle>Shopping Truck ({totalQuantity})</SheetTitle>
              <SheetDescription className="text-[--p-color]">
                All furnitures you added in the truck
              </SheetDescription>
            </div>
            <Button
              className="w-28 !text-red-500 hover:bg-destructive/15 border-destructive/20 dark:border-destructive/50"
              size="sm"
              variant="outline"
              onClick={() => {
                startDeleteAll(async () => {
                  if (user) {
                    await deleteAllItemsFromTruck(user.id as string);
                    setTruckItems([]);
                  }
                });
              }}
              disabled={isDeleteAllPending}
            >
              {isDeleteAllPending ? (
                <BeatLoader color="red" size={12} />
              ) : (
                <>
                  <span>Remove All</span>
                  <Trash2 size={16} className="ml-1" />
                </>
              )}
            </Button>
          </div>
        </SheetHeader>
        <>
          <div className="overflow-y-auto pr-4">
            <GridList
              records={truckItems}
              renderItem={(item) => (
                <ProductItem key={item.id} isVertical={false} {...item} />
              )}
              SkeletonComponent={ProductItemSkeleton}
              SkeletonComponentProps={{ isVertical: false }}
              className="grid-cols-1 mr-2"
            />
          </div>

          <div className="space-y-4 pr-6">
            <Separator className="bg-[--line-color]" />
            <div className="space-y-1.5 text-sm">
              <div className="flex font-semibold">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex font-semibold">
                <span className="flex-1">Transaction Fee</span>
                <span>{formatCurrency(0)}</span>
              </div>

              <div className="flex font-semibold">
                <span className="flex-1">Total</span>
                <span>{formatCurrency((totalPriceInCents ?? 0) / 100)}</span>
              </div>
            </div>
            <SheetFooter>
              {truckItems?.length ? (
                <SheetTrigger
                  asChild
                  className="bg-[--btn-color-2] hover:bg-[--btn-hover-color-2]"
                >
                  <Button className="w-full" asChild>
                    <Link href="" className="!text-white">
                      Continue to Checkout
                    </Link>
                  </Button>
                </SheetTrigger>
              ) : null}
            </SheetFooter>
          </div>
        </>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingTruck;
