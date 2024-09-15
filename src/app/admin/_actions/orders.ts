"use server";

import db from "@/db/db";

// - - - GET - - -

export const getOrders = async () => {
  try {
    return await db.order.findMany({
      select: {
        pricePaidInCents: true,
        id: true,
        orderItems: true,
        customer: { select: { userEmail: true, id: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
};

// - - - DELETE - - -
export const deleteOrder = async (id: number) => {
  try {
    return await db.order.delete({ where: { id } });
  } catch {
    return null;
  }
};
