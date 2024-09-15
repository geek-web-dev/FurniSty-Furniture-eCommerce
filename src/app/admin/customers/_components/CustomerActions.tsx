"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteCustomer } from "../../_actions/customers";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DeleteIcon = ({ id, userEmail }: { id: number; userEmail: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Trash2
      className={cn(
        "text-red-400 hover:text-red-500",
        isPending ? "cursor-wait pointer-events-none" : "cursor-pointer"
      )}
      onClick={() =>
        startTransition(async () => {
          await deleteCustomer(id, userEmail);
          router.refresh();
        })
      }
    />
  );
};

export default DeleteIcon;
