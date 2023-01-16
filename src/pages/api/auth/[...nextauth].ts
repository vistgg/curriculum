import {
  sendVerificationRequest,
  sendWelcomeEmail
} from "@lightbringer/email/nodemailer";
import { prisma } from "@lightbringer/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/"
  },
  providers: [
    EmailProvider({
      sendVerificationRequest,
      maxAge: 10 * 60 // Magic links are valid for 10 min only
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  events: { createUser: sendWelcomeEmail }
});
