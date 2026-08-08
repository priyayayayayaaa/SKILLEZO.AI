import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { env } from "@/core/config/env";
import { UserRole, AccountStatus } from "@/core/constants/enums";

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db as any),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
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

export type Auth = typeof auth;
