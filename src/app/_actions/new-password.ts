"use server";

import db from "@/db/db";
import { newPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/getUser";
import { getPasswordResetTokenByToken } from "@/utils/passwordResetToken";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing token!" };

  const validedFields = newPasswordSchema.safeParse(values);

  if (!validedFields.success) {
    return { error: "Invalid field!" };
  }

  const { password } = validedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Invalid token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (existingUser == "Network Error") return { error: "Network Error" };
  if (!existingUser) return { error: "Email does not exist!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });

  await db.paswordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
