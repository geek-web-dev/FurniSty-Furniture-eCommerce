import db from "@/db/db";
import { sendOrderConfirmation } from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  console.log("--- invoke ---");

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await db.product.findUnique({ where: { id: productId } });

    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // const userFields = {
    //   userEmail: email,
    //   orders: {
    //     create: {
    //       orderItems: {
    //         create: { productId, quantity: 1 },
    //       },
    //       pricePaidInCents,
    //     },
    //   },
    // };

    // const {
    //   orders: [order],
    // } = await db.customer.upsert({
    //   where: { userEmail: email }, // id? there is was error
    //   create: userFields,
    //   update: userFields, // update ?
    //   select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    // });

    // console.log("--- --- email:", email);

    await sendOrderConfirmation(email, pricePaidInCents);
  }
  return new NextResponse();
}
