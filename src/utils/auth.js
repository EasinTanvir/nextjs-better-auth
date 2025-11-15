import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { customSession } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    minPasswordLength: 6,
    enabled: true,
    autoSignIn: true,
    // need to verify email before signin
    requireEmailVerification: true,
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
      return {
        user: {
          ...user,
        },
        session,
      };
    }),
  ],
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("url", url);
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-in/email") {
        const { email, password } = ctx.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new APIError("NOT_FOUND", {
            message: "No User Found",
            code: "NOT_FOUND",
          });
        }
      }
    }),
  },
});
