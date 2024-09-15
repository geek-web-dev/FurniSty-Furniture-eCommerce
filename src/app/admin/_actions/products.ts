"use server";

import fs from "fs/promises";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { addProductSchema, imageSchema } from "@/schemas";
import { getUltimatePrice } from "@/utils/getUltimatePrice";

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  console.log(formData);
  console.log(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      category: data.category,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      ultimatePriceInCents: getUltimatePrice(data.priceInCents, data.offer),
      imagePath,
      isAvailableForPurchase: true,
      offer: data.offer,
      quantityInStock: data.quantityInStock,
    },
  });

  revalidatePath("/products-table");

  redirect("/admin/products/products-table");
}

const editSchema = addProductSchema.extend({
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      category: data.category,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      ultimatePriceInCents: getUltimatePrice(data.priceInCents, data.offer),
      imagePath,
      offer: data.offer,
      quantityInStock: data.quantityInStock,
    },
  });

  revalidatePath("/products-table");
  redirect("/admin/products/products-table");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/products-table");
  redirect("/admin/products/products-table");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/products-table");
  redirect("/admin/products/products-table");
}
