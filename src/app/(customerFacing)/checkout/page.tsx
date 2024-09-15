import CheckoutForm from "@/components/form/CheckoutForm";
import Stripe from "stripe";
import { getCartItems } from "../_actions/shoppingTruck";
import { notFound } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const page = async () => {
  const cartItems = await getCartItems();
  if (cartItems == null) return notFound();

  const priceAmountByCents = cartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.priceInCents,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: priceAmountByCents,
    currency: "USD",
    metadata: { productId: "" },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Stripe failed");
  }
  return (
    <div>
      <CheckoutForm
        withToggle={false}
        pricePaidInCents={priceAmountByCents}
        productId={""}
        clientSecret={paymentIntent.client_secret}
      />
    </div>
  );
};

export default page;
