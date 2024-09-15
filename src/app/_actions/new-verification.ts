"use server";

import db from "@/db/db";
import { getUserByEmail } from "@/utils/getUser";
import { getVerificationTokenByToken } from "@/utils/getVerificationToken";

export const newVerification = async (token: string, email: string) => {
  const existingToken = await getVerificationTokenByToken(token, email);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (existingUser == "Network Error") return { error: "Network Error" };

  if (!existingUser) {
    return { error: "Email does not exit" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    // when you modify your email
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
