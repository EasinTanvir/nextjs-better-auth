import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { customSession } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
      phone: {
        type: "string",
        input: false,
      },
    },
  },

  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      console.log("user ===", user);
      return {
        user: {
          ...user,
        },
        session,
      };
    }),
  ],
});
