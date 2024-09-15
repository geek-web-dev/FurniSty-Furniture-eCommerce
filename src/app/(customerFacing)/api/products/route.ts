import db from "@/db/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const priceRange = searchParams.get("price_range");
    const rateRange = searchParams.get("rate_range");
    const availability = searchParams.get("availability");

    let products = null;

    products = await db.product.findMany({
      where: {
        ultimatePriceInCents: {
          lt: Number(priceRange) * 100,
        },
        rate: {
          gte: parseFloat(rateRange ?? "0"),
        },
        quantityInStock: {
          gt: Number(availability),
        },
      },
    });

    return new NextResponse(JSON.stringify({ products }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in getting products: " + error.message, {
      status: 500,
    });
  }
};
