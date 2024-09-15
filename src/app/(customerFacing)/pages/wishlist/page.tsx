import GridList from "@/components/common/GridList";
import Heading from "@/components/common/Heading";
import ProductItem, {
  ProductItemSkeleton,
} from "@/components/ecommerce/product/ProductItem";
import { getProductsInWishlistByUserId } from "../../_actions/product";
import { currentUser } from "@/lib/auth";

const page = async () => {
  const user = await currentUser();
  const truckItems = await getProductsInWishlistByUserId(user?.id as string);
  return (
    <>
      <Heading title={"Wishlist"} location="/ pages / wishlist" />
      <GridList
        records={truckItems}
        renderItem={(item) => (
          <ProductItem
            key={item.id}
            isVertical={false}
            isWishlistItem={true}
            {...item}
          />
        )}
        SkeletonComponent={ProductItemSkeleton}
        SkeletonComponentProps={{ isVertical: false }}
        className="lg:grid-cols-2 mr-2"
      />
    </>
  );
};

export default page;
