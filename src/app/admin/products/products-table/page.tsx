import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, Edit, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/formatters";
import {
  ActiveTooggleDropdownItem,
  DeleteDropdownItem,
} from "../_components/ProductActions";
import Heading from "@/components/common/Heading";
import { getAllProducts } from "@/app/(customerFacing)/_actions/product";
import { cn } from "@/lib/utils";
import LinkButton from "@/components/common/LinkButton";

const ProjectsTablePage = async () => {
  const products = await getAllProducts();

  return (
    <>
      {/* <Alert actionName="delete" des="hello" /> */}
      <div className="flex items-center justify-between">
        <Heading title="Products Table" location="/ admin / products-table" />
        <LinkButton
          title="Create New Product"
          href="/admin/products/create-product"
        />
      </div>
      <Table className="mb-8">
        <TableHeader>
          <TableRow className="pointer-events-none">
            <TableHead>Availability</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Cart Items</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products != null && products.length
            ? products.map((product) => {
                const price = product.priceInCents / 100;
                const ordersCount = product.orderItems.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                );
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.isAvailableForPurchase ? (
                        <>
                          <CheckCircle2 className="stroke-green-600" />
                          <span className="sr-only">Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="stroke-destructive" />
                          <span className="sr-only">Unavailable</span>
                        </>
                      )}
                    </TableCell>
                    <TableCell className="text-nowrap overflow-hidden overflow-ellipsis max-w-[140px]">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-semibold flex">
                      {product.offer ? (
                        <span className="text-[--title-color] flex items-center">
                          {formatCurrency(
                            price - (price / 100) * product.offer
                          )}
                        </span>
                      ) : null}
                      <span
                        className={cn(
                          product.offer
                            ? "line-through text-slate-500 ml-1"
                            : "text-[--title-color]"
                        )}
                      >
                        {formatCurrency(price)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatNumber(ordersCount)}
                    </TableCell>

                    <TableCell>{product._count.cartItems}</TableCell>
                    <TableCell className="font-semibold">
                      {product.quantityInStock}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical />
                          <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <a href={`/admin/products/${product.id}/edit`}>
                              Edit
                              <Edit className="w-[16px] ml-auto text-orange-600" />
                            </a>
                          </DropdownMenuItem>

                          <ActiveTooggleDropdownItem
                            id={product.id}
                            isAvailableForPurchase={
                              product.isAvailableForPurchase
                            }
                          />
                          <DropdownMenuSeparator />
                          <DeleteDropdownItem
                            id={product.id}
                            disabled={
                              ordersCount || product._count.cartItems
                                ? true
                                : false
                            }
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
    </>
  );
};

export default ProjectsTablePage;
