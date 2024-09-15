import { getProductById } from "@/app/(customerFacing)/_actions/product";
import AddToTruckButton from "@/components/ecommerce/product/AddToTruckButton";
import LoveButton from "@/components/ecommerce/product/LoveButton";
import StarRating from "@/components/common/StarRating";
import CheckoutForm from "@/components/form/CheckoutForm";
import { formatCurrency } from "@/utils/formatters";
import LottieHandler from "@/utils/LottieHandler";
import Image from "next/image";

import Stripe from "stripe";
import { cn } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const page = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product = await getProductById(productId);

  if (!product) {
    return (
      <LottieHandler type="notFound" message="this product does not exist" />
    );
  }
  if (product == "network error") {
    return <LottieHandler type="networkError" message="Network error!" />;
  }

  const offer = product.offer;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Stripe failed");
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-x-8">
        <div className="w-[800px] h-[800px] absolute -left-[160px] -z-1 -top-20 rounded-full bg-blue-500/15 dark:bg-blue-300/15"></div>
        {/* <div className="w-[50px] h-[50px] absolute -left-500px -z-1 top-0 rounded-full bg-blue-500 dark:bg-blue-300/15"></div> */}
        <div className="relative">
          <div className="relative">
            <Image
              src={product.imagePath}
              width={1000}
              height={700}
              alt={product.name}
              sizes=""
              loading="lazy"
              className="relative z-10"
            />
            <div className="absolute border-[3px] w-full h-full border-blue-500/15 dark:border-blue-300/15 top-2 left-2"></div>
            <div className="absolute w-[50px] h-[50px] border-[3px] border-blue-500/35 -top-2 -left-2"></div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold my-4 text-[--title-color]">
                {product.name}
              </h2>
              {/* reusable */}
              <LoveButton productId={product.id} onImage={false} />
            </div>
            <div className="flex justify-between items-center">
              <StarRating averageRate={product?.rate} />
              <span className="text-sm font-semibold ml-1">
                {product?.rate}
              </span>
              <span className="ml-2 opacity-75">
                ({product._count.orderItems})
              </span>
              <span className="ml-2 opacity-75 text-[--text-color]">
                ({product._count.orderItems} Sales)
              </span>
              {product.offer ? (
                <span className="ml-8 bg-[--badage-color] px-2 rounded text-white">
                  <span>Offer {product.offer}%</span>
                </span>
              ) : null}
              <span
                className={cn(
                  "ml-auto text-sm font-semibold",
                  product.quantityInStock > 1
                    ? "text-green-600"
                    : product.quantityInStock
                    ? "text-orange-600"
                    : "text-red-600"
                )}
              >
                {product.quantityInStock > 1
                  ? "Available"
                  : product.quantityInStock
                  ? "Only one in stock"
                  : "Not available"}
              </span>
            </div>
          </div>
          <p>
            note: if you want to purchase more than one furniture item, you
            should add to truck and you can increase and descrease quantity and
            purchase it from shopping truck
          </p>
        </div>
        <div>
          <div className="text-2xl font-bold flex items-center lg:mt-0 mt-4">
            <h2 className={offer ? "opacity-40 line-through" : ""}>
              {formatCurrency(product.priceInCents / 100)}
            </h2>
            {offer ? (
              <h2 className="ml-2">
                But Now is {formatCurrency(product.ultimatePriceInCents / 100)}
              </h2>
            ) : null}
          </div>
          <div className="my-4 flex flex-wrap gap-4">
            <AddToTruckButton
              quantityInStock={product.quantityInStock}
              productId={product.id}
              priceInCents={
                product.offer ? product.priceInCents : product.priceInCents
              }
            />
          </div>

          <h3 className="mt-4 font-semibold">
            This Furniture for{" "}
            <span className="capitalize font-bold">
              {product.category.split("-").join(" ")}
            </span>
          </h3>
          <p className="my-4">{product.description}</p>
          {/* Stripe */}
          {product.quantityInStock ? (
            <CheckoutForm
              pricePaidInCents={product.ultimatePriceInCents}
              productId={product.id}
              clientSecret={paymentIntent.client_secret}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default page;
