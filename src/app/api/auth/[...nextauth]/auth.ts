import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/lib/constants";
import { redirect } from "next/navigation";
import { signInSchema } from "@/lib/validation/signInSchema";

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data, error } = signInSchema.safeParse(credentials);

        if (error) {
          return { error: "Invalid fields" };
        }

        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const user = await res.json();

        if (res.ok && data) {
          return user;
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token.accessToken) {
        throw new Error("invalid credentials");
      }

      const request = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      const user = await request.json();

      // If no error and we have user data, return it
      if (request.ok && user) {
        session.user = user;
        session.accessToken = token.accessToken;

        return session;
      }

      // Return null if user data could not be retrieved
      return redirect("/login");
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
