"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

// - - - GET - - -
export const getAllProducts = async () => {
  try {
    return await db.product.findMany({
      select: {
        id: true,
        name: true,
        priceInCents: true,
        category: true,
        imagePath: true,
        offer: true,
        isAvailableForPurchase: true,
        quantityInStock: true,
        orderItems: true,
        _count: { select: { cartItems: true } },
      },
      orderBy: { name: "asc" },
    });
  } catch {
    return null;
  }
};

export const getMostProducts = async () => {
  try {
    return await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    });
  } catch {
    return null;
  }
};

export const getNewestProducts = async () => {
  try {
    return await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch {
    return null;
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    return await db.product.findMany({
      where: {
        category,
      },
    });
  } catch {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    return await db.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        priceInCents: true,
        ultimatePriceInCents: true,
        offer: true,
        imagePath: true,
        category: true,
        description: true,
        quantityInStock: true,
        isAvailableForPurchase: true,
        _count: { select: { orderItems: true } },
        rate: true,
      },
    });
  } catch {
    return "network error";
  }
};

export const getProductsInTruckByUserId = async (userId: string) => {
  try {
    return await db.product.findMany({
      where: { cartItems: { some: { userId } } },
    });
  } catch {
    return null;
  }
};

export const getProductsInWishlistByUserId = async (userId: string) => {
  try {
    const products = await db.product.findMany({
      where: { wishlistItems: { some: { userId } } },
    });

    return products ? products : [];
  } catch {
    return null;
  }
};

export const getProductSales = async (id: string) => {
  try {
    return await db.orderItem.count({ where: { productId: id } });
  } catch (error) {
    return 0;
  }
};

export const getProductImageById = async (id: string) => {
  try {
    return await db.product.findUnique({
      where: { id },
      select: { imagePath: true },
    });
  } catch (error) {
    return null;
  }
};
