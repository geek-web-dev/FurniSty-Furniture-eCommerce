"use server";

import db from "@/db/db";

export const deleteUserById = async (id: string) => {
  try {
    await db.user.delete({ where: { id } });
  } catch (error) {
    return null;
  }
};
