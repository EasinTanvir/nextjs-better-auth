import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prismaCli } from "@/prismaCli";

export const auth = betterAuth({
  database: prismaAdapter(prismaCli, {
    provider: "mongodb",
  }),
});
