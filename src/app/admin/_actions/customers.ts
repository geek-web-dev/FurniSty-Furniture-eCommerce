"use server";

import db from "@/db/db";

export const getCustomers = async () => {
  try {
    return await db.customer.findMany({
      select: {
        id: true,
        userEmail: true,
        orders: { select: { pricePaidInCents: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
};

export const deleteCustomer = async (id: number, userEmail: string) => {
  try {
    await db.customer.delete({ where: { id, userEmail } });
  } catch (error) {
    console.log(error);

    return null;
  }
};
