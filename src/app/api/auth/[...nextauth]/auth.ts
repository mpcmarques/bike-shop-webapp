import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/app/lib/constants";

const authOptions: NextAuthConfig = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      credentials: {
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("CREDENTIALS", credentials);
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const { access_token } = await res.json();

        console.log(access_token);

        // If no error and we have user data, return it
        if (res.ok && access_token) {
          return { access_token, email: credentials?.email };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session => ", session, token);

      const request = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      const user = await request.json();

      session.user = user;
      session.accessToken = token.accessToken;

      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
