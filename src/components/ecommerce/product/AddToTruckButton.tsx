"use client";
import { addItemInShoppingTruck } from "@/app/(customerFacing)/_actions/shoppingTruck";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { BeatLoader } from "react-spinners";
import {
  getProductsInTruckByUserId,
  getProductsInWishlistByUserId,
} from "@/app/(customerFacing)/_actions/product";
import { getCartItemsQauntity } from "@/app/(customerFacing)/_actions/shoppingTruck";
import { useAppContext } from "@/context/useAppContext";
import { deleteWishlistItem } from "@/app/(customerFacing)/_actions/wishlist";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { user } from "@/config";

type AddToTruckButtonProps = {
  isVertical?: boolean;
  isWishlistItem?: boolean;
  quantityInStock: number;
  productId: string;
  priceInCents: number;
};

const AddToTruckButton = ({
  isVertical = true,
  isWishlistItem = false,
  quantityInStock,
  productId,
  priceInCents,
}: AddToTruckButtonProps) => {
  const [isAddPending, startAddTransition] = useTransition();
  const { setTruckItems, setTotalQuantity, setWishlistItems } = useAppContext();

  const router = useRouter();

  const quantityHandler = async () => {
    const prodcutsInTruck = await getProductsInTruckByUserId(user.id as string);
    setTruckItems(prodcutsInTruck);
    const getTotalQuantity = await getCartItemsQauntity(user?.id as string);
    if (!getTotalQuantity) return;
    setTotalQuantity(getTotalQuantity);
  };

  return (
    <Button
      className={cn(
        "bg-[--btn-color] hover:bg-[--btn-hover-color] group px-1.5",
        isVertical ? "w-[174px]" : "text-[12px] rounded-none mt-1 w-fit h-8 "
      )}
      disabled={isAddPending || !quantityInStock}
      onClick={() =>
        startAddTransition(async () => {
          // store in DB server
          await addItemInShoppingTruck(
            user.id as string,
            productId,
            1,
            priceInCents
          );
          await quantityHandler();
          if (isWishlistItem) {
            await deleteWishlistItem(user.id as string, productId);
            setWishlistItems(
              await getProductsInWishlistByUserId(user.id as string)
            );
          }
          router.refresh();
        })
      }
    >
      {isAddPending ? (
        <BeatLoader color="white" size={12} />
      ) : (
        <>
          <span className="text-white group-hover:scale-90 duration-100">
            Add To Truck{" "}
          </span>
          <Image
            src={"/icons/3d-truck.png"}
            width={26}
            height={26}
            alt=""
            className="ml-1 group-hover:scale-110 duration-100"
          />
        </>
      )}
    </Button>
  );
};

export default AddToTruckButton;
