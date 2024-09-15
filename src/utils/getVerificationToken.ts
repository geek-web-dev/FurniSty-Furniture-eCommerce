import db from "@/db/db";

export const getVerificationTokenByToken = async (
  token: string,
  email: string
) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { email_token: { email, token } },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
