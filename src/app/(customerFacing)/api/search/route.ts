import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query as string,
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
