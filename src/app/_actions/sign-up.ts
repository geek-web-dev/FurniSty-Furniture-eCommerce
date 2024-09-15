"use server";

import { signUpSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import db from "@/db/db";
import { getUserByEmail } from "@/utils/getUser";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const signup = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Field !" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser === "Network Error") {
    return { error: "Network Error" };
  }

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  // verification tocken email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent !" };
};
