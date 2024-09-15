"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteOrderItemInOrder } from "@/app/(customerFacing)/_actions/order";

export const DeleteMenuItem = ({ orderItemId }: { orderItemId: number }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      className="font-semibold"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrderItemInOrder(orderItemId);
          router.refresh();
        })
      }
    >
      Delete <Trash2 className="w-[16px] text-red-500 ml-auto" />
    </DropdownMenuItem>
  );
};
