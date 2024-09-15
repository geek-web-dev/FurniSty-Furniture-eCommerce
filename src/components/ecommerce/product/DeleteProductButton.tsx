import { getProductsInTruckByUserId } from "@/app/(customerFacing)/_actions/product";
import {
  deleteItemFromTruck,
  getCartItemsQauntity,
} from "@/app/(customerFacing)/_actions/shoppingTruck";
import { user } from "@/config";
import { useAppContext } from "@/context/useAppContext";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";

type DeleteProductButtonProps = {
  isVertical: boolean;
  isWishlistItem: boolean;
  productId: string;
};

const DeleteProductButton = ({
  isVertical,
  isWishlistItem,
  productId,
}: DeleteProductButtonProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const { setTruckItems, setTotalQuantity } = useAppContext();
  const router = useRouter();

  const quantityHandler = async () => {
    if (user) {
      const prodcutsInTruck = await getProductsInTruckByUserId(
        user.id as string
      );
      setTruckItems(prodcutsInTruck);
      const getTotalQuantity = await getCartItemsQauntity(user.id as string);
      console.log(getTotalQuantity);

      if (getTotalQuantity == null) return;
      setTotalQuantity(getTotalQuantity);
    }
  };

  return (
    <div>
      {isVertical || isWishlistItem ? null : isDeletePending ? (
        <ClipLoader className="absolute right-2" color="red" size={23} />
      ) : (
        <X
          onClick={() =>
            startDeleteTransition(async () => {
              await deleteItemFromTruck(user.id as string, productId);
              await quantityHandler(); // important !!

              router.refresh();
            })
          }
          className="text-red-400 absolute right-2 top-2 !mt-0 cursor-pointer hover:text-red-500 w-7 h-7 rounded-none"
        />
      )}
    </div>
  );
};

export default DeleteProductButton;
