import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { logInSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/getUser";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export default {
  providers: [
    // OAuth
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Credentails
    Credentials({
      async authorize(credentials) {
        // related by login
        const validatedFields = logInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || user == "Network Error" || !user.password) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.password // hashed password
          );
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
