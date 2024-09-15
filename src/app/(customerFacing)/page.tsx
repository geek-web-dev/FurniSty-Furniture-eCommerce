import GridList from "@/components/common/GridList";
import Heading from "@/components/common/Heading";
import ProductItem, {
  ProductItemSkeleton,
} from "@/components/ecommerce/product/ProductItem";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getMostProducts, getNewestProducts } from "./_actions/product";
import { categories, gifts } from "@/config";
import ShowList from "@/components/common/ShowList";
import Image from "next/image";
import dynamic from "next/dynamic";

const GiftCard = dynamic(() => import("./_components/GiftCard"));

type productsFetcherProps = {
  productsFetcher: () => Promise<Product[] | null>;
  title?: string;
};

const HomePage = async () => {
  return (
    <>
      <Heading title="Gifts & Most Popular & Newest Prodcuts" location="/" />
      <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        <ShowList
          list={categories}
          renderItem={(item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-center group"
            >
              <div className="relative flex flex-col items-center overflow-hidden h-auto border border-[--line-color]">
                <div className="w-full h-auto aspect-video  ">
                  <Image
                    src={item.imageSrc}
                    layout="fill"
                    alt={item.name}
                    className="rounded-lg shadow-xl select-none scale-110 group-hover:scale-105 duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="mt-2 group-hover:scale-[1.02] h-6 duration-300">
                {item.name}
              </h3>
            </Link>
          )}
        />
      </div>
      <main>
        <div className="my-12">
          <h2 className="text-3xl font-bold text-[--title-color]">Gifts</h2>
          <div className="grid mt-4 xl:grid-cols-3 lg:grid-cols-2 gap-4">
            <ShowList
              list={gifts}
              renderItem={(item) => <GiftCard {...item} />}
            />
          </div>
        </div>

        <ProductGridSection
          title="Most Popular"
          productsFetcher={getMostProducts}
        />

        <ProductGridSection
          title="Newest"
          productsFetcher={getNewestProducts}
        />
      </main>
    </>
  );
};

const ProductGridSection = async ({
  productsFetcher,
  title,
}: productsFetcherProps) => {
  const prodcuts = await productsFetcher();
  return (
    <div className="my-12">
      <div className="flex gap-4 my-4">
        <h2 className="text-3xl font-bold text-[--title-color]">{title}</h2>
        <Button
          variant="outline"
          asChild
          className="hover:bg-[--hover-color] border-[--hover-color]"
        >
          <Link href="/shop" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <GridList
        records={prodcuts}
        renderItem={(item) => <ProductItem key={item.id} {...item} />}
        SkeletonComponent={ProductItemSkeleton}
      />
    </div>
  );
};

export default HomePage;
