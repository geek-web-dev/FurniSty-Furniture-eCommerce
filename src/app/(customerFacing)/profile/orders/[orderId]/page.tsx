import { getOrderItemsByOrderId } from "@/app/(customerFacing)/_actions/order";
import { getProductById } from "@/app/(customerFacing)/_actions/product";
import Heading from "@/components/common/Heading";
import LinkButton from "@/components/common/LinkButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";
import { Edit, MoreVertical } from "lucide-react";
import Image from "next/image";
import { DeleteMenuItem } from "../_components/OrderActions";

const OrderPage = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const orderItems = await getOrderItemsByOrderId(Number(orderId));
  if (orderItems == null) {
    return (
      <h2 className="text-3xl font-semibold text-red-500">Network Error</h2>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Editing My Order" location="/ profile / orders" />
        <LinkButton title="Back to profile" href="/profile" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map(async (orderItem, i) => {
            const product = await getProductById(orderItem.productId);

            return product && product != "network error" ? (
              <TableRow key={i}>
                <TableCell>
                  <Image
                    src={product?.imagePath}
                    width={110}
                    height={50}
                    alt=""
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="text-nowrap overflow-hidden overflow-ellipsis max-w-[140px]">
                  {product?.name}
                </TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
                <TableCell>
                  {formatCurrency(product?.ultimatePriceInCents / 100)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild disabled={true}>
                        <a href={`/profile/orders/${orderId}`}>
                          Edit
                          <Edit className="w-[16px] ml-auto text-orange-600" />
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DeleteMenuItem orderItemId={orderItem.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderPage;
