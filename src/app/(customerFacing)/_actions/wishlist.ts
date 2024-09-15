"use server";

import db from "@/db/db";

// - - - POST - - -
export const addOrRemoveWishlistItem = async (
  userId: string,
  productId: string
) => {
  try {
    const wishlistItem = await db.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (wishlistItem) {
      await db.wishlistItem.delete({
        where: { userId_productId: { userId, productId } },
      });
    } else {
      await db.wishlistItem.create({ data: { userId, productId } });
    }
  } catch {
    return null;
  }
};

// - - - GET - - -
export const isWishlistItemExist = async (
  userId: string,
  productId: string
) => {
  try {
    const wishlistItem = await db.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    return wishlistItem ? true : false;
  } catch {
    return null;
  }
};

// - - - DELETE - - -
export const deleteWishlistItem = async (userId: string, productId: string) => {
  try {
    await db.wishlistItem.delete({
      where: { userId_productId: { userId, productId } },
    });
  } catch {
    return null;
  }
};

export const deleteAllWishlistItems = async (userId: string) => {
  try {
    await db.wishlistItem.deleteMany({
      where: { userId },
    });
  } catch {
    return null;
  }
};
