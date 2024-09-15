"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import Alert from "@/components/common/Alert";

export const ActiveTooggleDropdownItem = ({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        })
      }
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
      {isAvailableForPurchase ? (
        <XCircle className="w-[16px] ml-auto text-red-600" />
      ) : (
        <CheckCircle2 className="w-[16px] ml-auto text-green-600" />
      )}
    </DropdownMenuItem>
  );
};

export const DeleteDropdownItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="font-semibold"
      disabled={disabled || isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        })
      }
    >
      Delete <Trash2 className="w-[16px] text-red-500 ml-auto" />
    </DropdownMenuItem>
  );
};

// <Alert
//   actionName="Delete"
//   des="you will delete product"
//   action={actionHandler}
//   className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
// />;
