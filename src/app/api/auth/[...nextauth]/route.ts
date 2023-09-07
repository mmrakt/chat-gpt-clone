import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../libs/prisma";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

/**
 * Configure NextAuth
 */
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

export { authHandler as GET, authHandler as POST };
