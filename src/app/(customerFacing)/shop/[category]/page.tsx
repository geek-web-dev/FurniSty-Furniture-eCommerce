import GridList from "@/components/common/GridList";
import Heading from "@/components/common/Heading";
import React from "react";
import { getProductsByCategory } from "../../_actions/product";
import ProductItem, {
  ProductItemSkeleton,
} from "@/components/ecommerce/product/ProductItem";

const page = async ({
  params: { category },
}: {
  params: { category: string };
}) => {
  const products = await getProductsByCategory(category);
  return (
    <>
      <Heading
        title={category.split("-").join(" ")}
        location={`/ shop / ${category}`}
      />
      <GridList
        records={products}
        renderItem={(item) => <ProductItem {...item} />}
        SkeletonComponent={ProductItemSkeleton}
      />
    </>
  );
};

export default page;
