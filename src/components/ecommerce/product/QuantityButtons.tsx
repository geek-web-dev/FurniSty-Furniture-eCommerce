import { getProductsInTruckByUserId } from "@/app/(customerFacing)/_actions/product";
import {
  addItemInShoppingTruck,
  decreaseQuantityOfCartItem,
  deleteItemFromTruck,
  getCartItemQauntity,
  getCartItemsQauntity,
} from "@/app/(customerFacing)/_actions/shoppingTruck";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/useAppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type QuantityButtonsProps = {
  userId: string;
  productId: string;
  priceInCents: number;
};

const QuantityButtons = ({
  userId,
  productId,
  priceInCents,
}: QuantityButtonsProps) => {
  const { setTotalQuantity, setTruckItems } = useAppContext();
  const [isIncreasePending, startIncreaseTransition] = useTransition();
  const [isDecreasePending, startDecreaseTransition] = useTransition();
  const [quantity, setQuantity] = useState<number | undefined | null>(1);

  const BtnClass =
    "p-0 w-6 h-6 text-black bg-gray-200 hover:bg-gray-300 dark:bg-[#333] dark:text-white dark:hover:bg-[#444] rounded-none";

  const router = useRouter();
  const quantityHandler = async () => {
    if (userId) {
      setQuantity(await getCartItemQauntity(userId, productId));

      const getTotalQuantity = await getCartItemsQauntity(userId);
      if (getTotalQuantity == null) {
        return console.log("you can get total quantity");
      }
      setTotalQuantity(getTotalQuantity);
    }
  };

  useEffect(() => {
    quantityHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* FIX IT */}
      <Button
        className={BtnClass}
        onClick={() =>
          startIncreaseTransition(async () => {
            await addItemInShoppingTruck(userId, productId, 1, priceInCents);

            await quantityHandler();
            router.refresh();
          })
        }
        disabled={isIncreasePending}
      >
        +
      </Button>
      <span className="font-semibold mx-2">{quantity}</span>
      <Button
        className={BtnClass}
        onClick={() => {
          startDecreaseTransition(async () => {
            if (quantity && quantity > 1) {
              await decreaseQuantityOfCartItem(userId, productId);
            } else {
              await deleteItemFromTruck(userId, productId);
              setTruckItems(await getProductsInTruckByUserId(userId));
            }

            await quantityHandler();
            router.refresh();
          });
        }}
        disabled={isDecreasePending}
      >
        -
      </Button>
    </>
  );
};

export default QuantityButtons;
