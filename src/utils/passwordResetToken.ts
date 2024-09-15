import db from "@/db/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.paswordResetToken.findUnique({
      where: { token },
    });

    return passwordToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.paswordResetToken.findFirst({
      where: { email },
    });

    return passwordToken;
  } catch {
    return null;
  }
};
