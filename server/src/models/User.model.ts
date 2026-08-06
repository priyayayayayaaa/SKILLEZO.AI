import { Schema, model, Document, Types } from "mongoose";
import { UserRole, AccountStatus } from "../constants/enums";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: UserRole;
  emailVerified: boolean;
  accountStatus: AccountStatus;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.CANDIDATE,
      index: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      required: true,
      default: AccountStatus.ACTIVE,
      index: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const UserModel = model<IUser>("User", userSchema);
