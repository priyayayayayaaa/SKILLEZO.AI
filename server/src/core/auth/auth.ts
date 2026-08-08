import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { toNodeHandler } from "better-auth/node";
import mongoose from "mongoose";
import { env } from "@/core/config/env";
import { UserRole, AccountStatus } from "@/core/constants/enums";

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db as any),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: UserRole.CANDIDATE,
        input: false,
      },
      accountStatus: {
        type: "string",
        required: false,
        defaultValue: AccountStatus.ACTIVE,
        input: false,
      },
      lastLoginAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
});

export const authHandler = toNodeHandler(auth);

export type Auth = typeof auth;
