import { notFound } from "next/navigation";
import Stripe from "stripe";
import Image from "next/image";
import db from "@/db/db";
import { formatCurrency } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUltimatePrice } from "@/utils/getUltimatePrice";
import {
  deleteAllItemsFromTruck,
  deleteItemFromTruck,
} from "../../_actions/shoppingTruck";
import { user } from "@/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PurchaseSuccessPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.productId == null) return notFound();

  if (paymentIntent.metadata.productId === "") {
    await deleteAllItemsFromTruck(user?.id as string);
    return <p>your purchase succeeded</p>;
  }

  await deleteItemFromTruck(
    user?.id as string,
    paymentIntent.metadata.productId
  );

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });

  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div>
      <h1
        className={cn(
          "mb-4 text-2xl",
          isSuccess ? "text-green-500" : "text-red-500"
        )}
      >
        {isSuccess ? "Success Purchase and your order in queue" : "Error"}{" "}
        {" !"}
      </h1>
      <div className="flex items-center">
        <Image
          src={product.imagePath}
          width={250}
          height={0}
          alt={product.name}
          className="mr-6"
        />
        <div>
          <h1 className="text-2xl font-semibold ">{product.name}</h1>
          <p className="text-2xl font-semibold my-4">
            {formatCurrency(
              getUltimatePrice(product.priceInCents / 100, product.offer)
            )}
          </p>
          {!isSuccess ? (
            <Button>
              <Link href={`shop/${product.category}/${product.id}`}>
                Try Again
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
