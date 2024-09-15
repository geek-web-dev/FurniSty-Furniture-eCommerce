"use server";

import db from "@/db/db";
import { CartItem } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getProductById } from "./product";

// - - - POST - - -
export const addItemInShoppingTruck = async (
  userId: string,
  productId: string,
  quantity: number,
  priceInCents: number
) => {
  try {
    const cartItem = await db.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) return;

    if (!cartItem) {
      await db.cartItem.create({
        data: { userId, productId, quantity, priceInCents },
      });
    } else {
      await db.cartItem.update({
        where: { userId_productId: { productId, userId } },
        data: {
          quantity: {
            increment:
              product?.quantityInStock >= cartItem.quantity + quantity
                ? quantity
                : 0,
          },
        },
      });
    }
    revalidatePath("/");
  } catch {
    return null;
  }
};

// - - - PATCH - - -
export const decreaseQuantityOfCartItem = async (
  userId: string,
  productId: string
) => {
  try {
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) return;

    await db.cartItem.update({
      where: { userId_productId: { userId, productId } },
      data: { quantity: { decrement: 1 } },
    });
  } catch {
    return null;
  }
};

// - - - DELETE - - -
export const deleteItemFromTruck = async (
  userId: string,
  productId: string
) => {
  try {
    await db.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });
  } catch {
    return null;
  }
};

export const deleteAllItemsFromTruck = async (userId: string) => {
  try {
    await db.cartItem.deleteMany({
      where: { userId },
    });
  } catch {
    return null;
  }
};

// - - - GET - - -
export const getCartItems = async () => {
  try {
    return await db.cartItem.findMany();
  } catch {
    return null;
  }
};

export const getCartItemQauntity = async (
  userId: string,
  productId: string
) => {
  try {
    const item = (await db.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    })) as CartItem;
    return item.quantity;
  } catch {
    return null;
  }
};

export const getCartItemsQauntity = async (userId: string) => {
  try {
    const cartItems = await db.cartItem.findMany({ where: { userId } });
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  } catch {
    return null;
  }
};

export const getCartItemsTotalPrice = async (userId: string) => {
  try {
    const cartItems = await db.cartItem.findMany({ where: { userId } });
    return cartItems.reduce(
      (acc, curr) => (acc + curr.quantity * curr.priceInCents) as number,
      0
    );
  } catch {
    return null;
  }
};
