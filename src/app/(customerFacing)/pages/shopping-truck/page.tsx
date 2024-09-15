import GridList from "@/components/common/GridList";
import Heading from "@/components/common/Heading";
import ProductItem, {
  ProductItemSkeleton,
} from "@/components/ecommerce/product/ProductItem";
import { getProductsInTruckByUserId } from "../../_actions/product";
import { currentUser } from "@/lib/auth";
import Image from "next/image";

import sty from "./styles.module.css";
import { cn } from "@/lib/utils";
const { animate } = sty;

const page = async () => {
  const user = await currentUser();
  const truckItems = await getProductsInTruckByUserId(user?.id as string);
  return (
    <>
      <Heading title={"Shopping Truck"} location="/ pages / shopping-truck" />
      <div className="my-8 relative">
        <Image
          src={"/icons/truck.svg"}
          width={30}
          height={30}
          alt=""
          className={cn("absolute -top-[27px] ", animate)}
        />
        <div className="h-px bg-[--line-color]"></div>
      </div>
      <GridList
        records={truckItems}
        renderItem={(item) => (
          <ProductItem key={item.id} isVertical={false} {...item} />
        )}
        SkeletonComponent={ProductItemSkeleton}
        SkeletonComponentProps={{ isVertical: false }}
        className="lg:grid-cols-2 mr-2"
      />
    </>
  );
};

export default page;
