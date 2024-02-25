import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "../../../../data/user";
import { client } from "../../../../libs/prismadb";
import { LoginSchema } from "../../../../schemas";

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          // console.log(validatedFields.data);

          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashedPassword) return null;

          const passwordsMatch = await compare(password, user.hashedPassword);
          // console.log(passwordsMatch);
          console.log(user);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  adapter: PrismaAdapter(client),
  secret: process.env.NEXTAUTH_SECRET!,
} satisfies NextAuthConfig;
