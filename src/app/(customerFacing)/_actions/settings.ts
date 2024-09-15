"use server";
import db from "@/db/db";
import bcrypt from "bcryptjs";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { settingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/utils/getUser";
import { z } from "zod";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: "unauthorized" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "unauthorized or network error" };

  // with provider
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser == "Network Error") return { error: "Network Error" };

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) return { error: "Incorrect password" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: "Settings Updated" };
};
