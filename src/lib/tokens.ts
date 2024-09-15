import db from "@/db/db";
import { getVerificationTokenByEmail } from "@/utils/getVerificationToken";
import { getPasswordResetTokenByEmail } from "@/utils/passwordResetToken";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/utils/twoFactorToken";

const hour_in_milliseconds = 60 * 60 * 1000;

// when user reset his password
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + hour_in_milliseconds);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.paswordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.paswordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

// when user signup
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + hour_in_milliseconds);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

// when user need to 2FA
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 300000); // 5 min

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
