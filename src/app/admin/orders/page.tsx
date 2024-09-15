import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters";
import Heading from "@/components/common/Heading";
import { getOrders } from "../_actions/orders";
import DeleteOrderIcon from "./_components/OrderAction";
import { cn } from "@/lib/utils";
const OrdersPage = async () => {
  const orders = await getOrders();

  const status: "pending" | "done" = "pending";

  return (
    <>
      <Heading title="Orders Table" location="/ admin / orders" />
      <Table className="mb-8">
        <TableHeader>
          <TableRow className="pointer-events-none">
            <TableHead>Status</TableHead>
            <TableHead>Products Count</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders != null && orders.length
            ? orders.map((order) => {
                const itemsCount = order.orderItems.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                );
                return (
                  <TableRow key={order.id}>
                    <TableCell
                      className={cn(
                        "font-semibold",
                        status === "pending"
                          ? "text-orange-500"
                          : "text-green-500"
                      )}
                    >
                      {status}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {itemsCount}
                    </TableCell>
                    <TableCell className="text-[--p-color]">
                      {order.customer.userEmail}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(order.pricePaidInCents / 100)}
                    </TableCell>

                    <TableCell>
                      <DeleteOrderIcon id={order.id} />
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default OrdersPage;
