import NextAuth from "next-auth";

import authconfig from "./app/api/auth/[...nextauth]/option";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authconfig,
});
