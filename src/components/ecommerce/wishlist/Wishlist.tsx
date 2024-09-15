import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import styles from "../../../app/styles.module.css";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/useAppContext";
import { useEffect, useState, useTransition } from "react";
import { getProductsInWishlistByUserId } from "@/app/(customerFacing)/_actions/product";
import { useCurrentUser } from "@/hooks/use-current-user";
import GridList from "@/components/common/GridList";
import ProductItem, { ProductItemSkeleton } from "../product/ProductItem";
import { Button } from "@/components/ui/button";
import { deleteAllWishlistItems } from "@/app/(customerFacing)/_actions/wishlist";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { Trash2 } from "lucide-react";
const { pump } = styles;

const Wishlist = () => {
  const { wishlistItems, setWishlistItems, user } = useAppContext();

  const [isDeleteAllPending, startDeleteAll] = useTransition();

  const getProductsFromWishlist = async () => {
    setWishlistItems(await getProductsInWishlistByUserId(user?.id as string));
  };

  useEffect(() => {
    getProductsFromWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center relative group">
        <Image
          src={"/icons/wishlist.png"}
          width={30}
          height={30}
          alt=""
          className="group-hover:scale-110 duration-75"
          loading="lazy"
        />
        {wishlistItems?.length ? (
          <span
            className={cn(
              "text-sm font-medium text-white bg-blue-600 rounded-full w-[22px] h-[22px] flex items-center justify-center absolute -top-3 -left-2",
              pump
            )}
          >
            {wishlistItems.length}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6 mt-4">
          <div className="flex justify-between items-end">
            <div className="text-start">
              <SheetTitle>
                {" "}
                Wishlist ({wishlistItems ? wishlistItems.length : 0})
              </SheetTitle>
              <SheetDescription className="text-[--p-color]">
                All furnitures you wish to buy it!
              </SheetDescription>
            </div>
            <Button
              variant="outline"
              className="!text-red-500 hover:bg-destructive/15 border-destructive/15 dark:border-destructive/50"
              onClick={() =>
                startDeleteAll(async () => {
                  await deleteAllWishlistItems(user?.id as string);
                  setWishlistItems([]);
                })
              }
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
        <div className="overflow-y-auto pr-4">
          <GridList
            records={wishlistItems}
            renderItem={(item) => (
              <ProductItem
                key={item.id}
                isVertical={false}
                isWishlistItem={true}
                {...item}
              />
            )}
            SkeletonComponent={ProductItemSkeleton}
            SkeletonComponentProps={{ isVertical: false }}
            className="grid-cols-1 mr-2"
          />
        </div>
        {/* <Separator  /> */}
      </SheetContent>
    </Sheet>
  );
};

export default Wishlist;
