"use client";
import { getProductsInWishlistByUserId } from "@/app/(customerFacing)/_actions/product";
import {
  addOrRemoveWishlistItem,
  isWishlistItemExist,
} from "@/app/(customerFacing)/_actions/wishlist";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/useAppContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { user } from "@/config";

type LoveButtonProp = {
  productId: string;
  isVertical?: boolean;
  onImage?: boolean;
  className?: string;
};

const LoveButton = ({
  productId,
  isVertical = true,
  onImage = true,
  className,
}: LoveButtonProp) => {
  const [isUserLove, setIsUserLove] = useState(false);
  const [isLovePending, startLoveTransition] = useTransition();

  const router = useRouter();

  const { setWishlistItems } = useAppContext();

  const loveHandler = async () => {
    const check = await isWishlistItemExist(user?.id as string, productId);
    if (check == null) return console.log("you can't add love");
    setIsUserLove(check);
  };

  useEffect(() => {
    if (user) {
      loveHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    //
    <Button
      className={cn(
        className,
        onImage ? "absolute group" : "",
        "p-0 h-8 w-8 bg-white dark:bg-black z-10",
        isLovePending ? "cursor-not-allowed pointer-events-none" : "",
        isVertical && onImage
          ? "right-2 top-2 rounded-sm h-8 w-8"
          : onImage
          ? "right-1 top-1 h-5 w-5 rounded-none"
          : ""
      )}
      onClick={() => {
        startLoveTransition(async () => {
          await addOrRemoveWishlistItem(user?.id as string, productId);
          await loveHandler();
          setWishlistItems(
            await getProductsInWishlistByUserId(user?.id as string)
          );
          router.refresh();
        });
      }}
    >
      {isLovePending ? (
        <ClipLoader size={16} color="red" className="z-10" />
      ) : (
        <FAI
          icon={faHeart}
          className={cn(
            "z-10 p-0.5 cursor-pointer group-hover:scale-95 duration-100 w-4",
            isUserLove
              ? "text-red-500"
              : "text-gray-400 group-hover:text-red-400"
          )}
        />
      )}
    </Button>
  );
};

export default LoveButton;
