import Heading from "@/components/common/Heading";
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
import { currentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Edit, MoreVertical } from "lucide-react";
import Image from "next/image";
import { getOrdersByCustomerId } from "../_actions/order";
import { dateFormatter } from "@/utils/dateFormatter";
import { formatCurrency } from "@/utils/formatters";
import LinkButton from "@/components/common/LinkButton";
import { DeleteDropdownItem } from "./_components/ProfileActions";
import { createOrGetCustomer } from "../_actions/customer";
import LottieHandler from "@/utils/LottieHandler";

const ProfilePage = async () => {
  const user = await currentUser();

  const customer = await createOrGetCustomer(user?.email as string);

  if (user == null) {
    return <LottieHandler type="notFound" message="Not Found 404!" />;
  }

  if (customer == null) {
    return <LottieHandler type="networkError" message="Network Error" />;
  }

  const orders = await getOrdersByCustomerId(customer.id);

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Profile" location="/ profile" />
        <LinkButton title="Profile Settings" href="/pages/settings" />
      </div>
      <div>
        <Image
          src={user?.image ?? ""}
          width={100}
          height={100}
          alt="Profile Iamge"
          className="rounded-full"
        />
        <h2 className="text-[--sub-title] font-semibold text-lg my-2">
          {user?.name}
        </h2>
        <p>{user?.email}</p>
        <Table className="my-8">
          <TableHeader>
            <TableRow className="pointer-events-none ">
              <TableHead>Status</TableHead>
              <TableHead>Order Items</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders != null && orders.length
              ? orders.map((order, i) => {
                  const itemsCount = order.orderItems.reduce(
                    (acc, curr) => acc + curr.quantity,
                    0
                  );
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-semibold">
                        <div
                          className={cn(
                            "py-1 px-2 rounded-sm text-white text-[12px] w-[62px] text-center",
                            order.isDone
                              ? "bg-green-400/75"
                              : "bg-orange-400/75"
                          )}
                        >
                          {order.isDone ? "Done" : "pending"}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {itemsCount}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(order.pricePaidInCents / 100)}
                      </TableCell>
                      <TableCell className="font-semibold text-[--p-color]">
                        {<p>{dateFormatter(order.createdAt)}</p>}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical />
                            <span className="sr-only">Actions</span>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuItem asChild disabled={order.isDone}>
                              <a href={`/profile/orders/${order.id}`}>
                                Edit
                                <Edit className="w-[16px] ml-auto text-orange-600" />
                              </a>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DeleteDropdownItem
                              orderId={order.id}
                              isDisabled={order.isDone}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProfilePage;
