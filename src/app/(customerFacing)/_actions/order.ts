"use server";

import db from "@/db/db";
import { getCartItemsTotalPrice } from "./shoppingTruck";
import { createOrGetCustomer } from "./customer";

// - - - POST - - -

// do not forget if there is no logged in user
export const createNewOrderHasOneItem = async (
  userEmail: string,
  productId: string,
  pricePaidInCents: number
) => {
  try {
    const user = await db.user.findUnique({ where: { email: userEmail } });
    if (user == null) return null;

    const customer = await createOrGetCustomer(userEmail);
    if (!customer) return null;

    // create order has one items
    await db.order.create({
      data: {
        customerId: customer.id,
        orderItems: {
          create: { productId, quantity: 1 },
        },
        pricePaidInCents,
      },
    });

    // decrease quantityInStock by 1 for one product
    await db.product.update({
      where: { id: productId },
      data: { quantityInStock: { decrement: 1 } },
    });
  } catch {
    return null;
  }
};

export const createNewOrder = async (userEmail: string) => {
  try {
    const customer = await createOrGetCustomer(userEmail);
    if (!customer) return null;

    const user = await db.user.findUnique({ where: { email: userEmail } });
    if (user == null) return null;

    const pricePaidInCents = await getCartItemsTotalPrice(user.id);
    if (pricePaidInCents == null) return null;

    const cartItems = await db.cartItem.findMany({
      where: { userId: user.id },
    });

    // create order has many items
    await db.order.create({
      data: {
        customerId: customer.id,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        pricePaidInCents,
      },
    });

    // decrease quantityInStock for every product
    cartItems.map(async (item) => {
      await db.product.update({
        where: { id: item.productId },
        data: { quantityInStock: { decrement: item.quantity } },
      });
    });
  } catch {
    return null;
  }
};

// - - - GET - - -
export const isOrderExist = async (customerId: number, productId: string) => {
  const order = await db.order.findFirst({
    where: { customerId },
    select: { orderItems: true },
  });
  return order == null ? null : order.orderItems[0].productId === productId;
};

export const getOrdersByCustomerId = async (customerId: number) => {
  try {
    return await db.order.findMany({
      where: { customerId },
      select: {
        id: true,
        createdAt: true,
        pricePaidInCents: true,
        orderItems: true,
        isDone: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
};

export const getOrderItemsByOrderId = async (orderId: number) => {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      select: { orderItems: true },
    });
    return order?.orderItems;
  } catch (error) {
    return null;
  }
};

// - - - Edit - - -
// export const editOrder = async (id: number) => {
//   try {
//   } catch {
//     return null;
//   }
// };

// - - - DELETE - - -
export const deleteOrder = async (id: number) => {
  try {
    await db.order.delete({ where: { id } });
  } catch (error) {
    return null;
  }
};

export const deleteOrderItemInOrder = async (id: number) => {
  try {
    await db.orderItem.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};
