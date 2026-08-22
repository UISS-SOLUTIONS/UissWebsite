import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async () => {
        // Fail-closed (red-team #53): the legacy path compared plaintext
        // passwords against the database. Credential login is disabled until
        // the Supabase Auth cutover lands (#41) — any accepted login here
        // would mint a valid JWT that passes middleware.
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});
