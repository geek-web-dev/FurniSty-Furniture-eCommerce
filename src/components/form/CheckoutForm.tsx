"use client";
import React, { FormEvent, useState } from "react";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utils/formatters";
import { BeatLoader } from "react-spinners";
import {
  createNewOrder,
  createNewOrderHasOneItem,
} from "@/app/(customerFacing)/_actions/order";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { useAppContext } from "@/context/useAppContext";

type CheckoutFormProps = {
  pricePaidInCents: number;
  productId: string;
  clientSecret: string;
  withToggle?: boolean;
};

// env
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = ({
  pricePaidInCents,
  productId,
  clientSecret,
  withToggle = true,
}: CheckoutFormProps) => {
  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <Form
        pricePaidInCents={pricePaidInCents}
        productId={productId}
        withToggle={withToggle}
      />
    </Elements>
  );
};

const Form = ({
  pricePaidInCents,
  productId,
  withToggle,
}: {
  pricePaidInCents: number;
  productId: string;
  withToggle?: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [open, setOpen] = useState(false);

  const { user } = useAppContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;
    setLoading(true);

    if (productId != "") {
      await createNewOrderHasOneItem(
        user?.email as string,
        productId,
        pricePaidInCents
      );
    } else {
      await createNewOrder(user?.email as string);
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type == "card_error" || error.type == "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setLoading(false));

    // and then send email and, there is an error with using webhooks
  };

  return (
    <>
      {withToggle ? (
        <Button
          size="lg"
          className="group mb-4 bg-yellow-500 text-white hover:bg-orange-400/90 group"
          onClick={() => setOpen((p) => !p)}
        >
          <span className="group-hover:scale-90 duration-100">Buy Now </span>
          <Image
            src={"/icons/card.png"}
            alt=""
            width={30}
            height={30}
            className="ml-2 group-hover:scale-110 duration-100"
          />
        </Button>
      ) : null}
      <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto ">
        {open || !withToggle ? (
          <Card className="mb-12 bg-white">
            <CardHeader>
              <CardTitle className="text-black">Checkout</CardTitle>
              {errorMessage ? (
                <CardDescription className="text-destructive">
                  {errorMessage}
                </CardDescription>
              ) : null}
            </CardHeader>
            <CardContent>
              {/* Payment Elements */}
              <PaymentElement />
              <LinkAuthenticationElement
                className="mt-4"
                onChange={(e) => setEmail(e.value.email)}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full dark:bg-[--btn-color-2] dark:text-white dark:hover:bg-[--btn-hover-color-2]"
                size="lg"
                disabled={stripe == null || elements == null || loading}
              >
                {loading ? (
                  <BeatLoader size={12} color="white" />
                ) : (
                  `Purchase - ${formatCurrency(pricePaidInCents / 100)}`
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : null}
      </form>
    </>
  );
};

export default CheckoutForm;
