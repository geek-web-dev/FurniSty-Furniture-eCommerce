"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteOrder } from "../../_actions/order";
import { Trash2 } from "lucide-react";

type DeleteDropdownItemProps = {
  orderId: number;
  isDisabled: boolean;
};

export const DeleteDropdownItem = ({
  orderId,
  isDisabled,
}: DeleteDropdownItemProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      className="font-semibold"
      disabled={isDisabled || isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrder(orderId);
          router.refresh();
        })
      }
    >
      Delete <Trash2 className="w-[16px] text-red-500 ml-auto" />
    </DropdownMenuItem>
  );
};
