"use server";
import db from "@/db/db";
import { auth } from "../../auth";

export const currentUser = async () => {
  // for show only
  return await db.user.findFirst();
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user.role;
};
