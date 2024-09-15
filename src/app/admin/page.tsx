import Heading from "@/components/common/Heading";
import { getOrders } from "./_actions/orders";
import { formatCurrency } from "@/utils/formatters";
import { getCustomers } from "./_actions/customers";
import db from "@/db/db";
import dynamic from "next/dynamic";

const AdminCard = dynamic(() => import("./_components/AdminCard"));
const ChartCard = dynamic(
  () => import("./products/_components/VistorsChartCard")
);
const ProfitChartCard = dynamic(
  () => import("./products/_components/ProfitChartCard")
);

const page = async () => {
  const orders = await getOrders();
  const customers = await getCustomers();

  const activeProducts = await db.product.findMany({
    where: { isAvailableForPurchase: true },
  });
  const inactiveProducts = await db.product.findMany({
    where: { isAvailableForPurchase: false },
  });

  const profitInCents = orders?.reduce(
    (acc, curr) => acc + curr.pricePaidInCents,
    0
  );
  const averageValue = formatCurrency(
    (profitInCents as number) /
      (orders && orders.length ? (customers ? customers.length : 0) : 1) /
      100
  );

  const users = await db.user.findMany();

  return (
    <>
      <Heading title="Admin Dashboard" location="/ admin /" />

      <div className="grid sm:space-y-0 space-y-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        <AdminCard
          title="Sales"
          svgPath={"/icons/profit.svg"}
          color="green"
          des={`${orders?.length} Orders`}
          data={`${
            profitInCents != null
              ? formatCurrency(profitInCents / 100)
              : "network error"
          } Total Income`}
        />
        <AdminCard
          title="Customers"
          svgPath={"/icons/customers.svg"}
          color="orange"
          des={`${averageValue} Average Value`}
          data={`${customers?.length} Customers`}
        />
        <AdminCard
          title="Active Products"
          svgPath={"/icons/sofa2.svg"}
          color="red"
          des={`${inactiveProducts.length} Inactive`}
          data={`${activeProducts.length} Active`}
        />
        <AdminCard
          title="Users"
          svgPath={"/icons/users.svg"}
          color="yellow"
          des={`${users.length} Users `}
          data={``}
        />
      </div>

      <div className="grid sm:space-y-0 space-y-4 md:grid-cols-2 gap-4 mt-4">
        <ChartCard />
        <ProfitChartCard />
      </div>
    </>
  );
};

export default page;
