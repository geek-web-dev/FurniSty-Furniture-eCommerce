"use server";

import db from "@/db/db";

export const createOrGetCustomer = async (userEmail: string) => {
  try {
    let customer = await db.customer.findUnique({
      where: { userEmail },
    });

    if (customer == null) {
      customer = await db.customer.create({ data: { userEmail } });
    }

    return customer;
  } catch (error) {
    return null;
  }
};

export const getCustomerByUserEmail = async (userEmail: string) => {
  try {
    return await db.customer.findUnique({
      where: { userEmail },
      select: { id: true },
    });
  } catch (error) {
    return null;
  }
};
