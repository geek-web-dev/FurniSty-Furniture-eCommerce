"use server";

import { logInSchema } from "@/schemas";
import { z } from "zod";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/utils/getUser";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/utils/twoFactorToken";
import db from "@/db/db";
import { getTwoFactorConfirmationByUserId } from "@/utils/twoFactorConfirmation";
import { signIn } from "../../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

export const login = async (
  values: z.infer<typeof logInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = logInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Field !" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser === "Network Error") {
    return { error: "Network Error" };
  }

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exit" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  // --- 2FA ---

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      // strange
      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }
      if (twoFactorToken.token != code) {
        return { error: "Your code does not match!" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Code expired!" };

      // delete immediately
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // create Two Factor Confirmation if not exist and create another one
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT || callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error type:", error.type);

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Somthing went wrong!" };
      }
    }
    throw error;
  }
};
