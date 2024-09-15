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
import { getCustomers } from "../_actions/customers";
import DeleteIcon from "./_components/CustomerActions";

const CustomersPage = async () => {
  const customers = await getCustomers();

  return (
    <>
      <Heading title="Customers Table" location="/ admin / customers" />
      <Table className="mb-8">
        <TableHeader>
          <TableRow className="pointer-events-none">
            <TableHead className="w-0">
              <span className="sr-only">Available For Purchase</span>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers != null && customers.length
            ? customers.map((customer) => {
                return (
                  <TableRow key={customer.id}>
                    <TableCell></TableCell>
                    <TableCell className="text-[--p-color]">
                      {customer.userEmail}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {customer.orders.length}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(
                        customer.orders.reduce(
                          (acc, curr) => acc + curr.pricePaidInCents,
                          0
                        ) / 100
                      )}
                    </TableCell>

                    <TableCell>
                      <DeleteIcon
                        id={customer.id}
                        userEmail={customer.userEmail}
                      />
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

export default CustomersPage;
