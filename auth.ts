import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const [user] = await db
          .select({
            id: users.id,
            email: users.email,
            password: users.password,
            role: users.role,
          })
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        if (!user) {
          return null;
        }
        if (user.password !== credentials.password) {
          return null;
        }
        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});
