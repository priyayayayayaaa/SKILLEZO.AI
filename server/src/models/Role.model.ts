import { Schema, model, Document, Types } from "mongoose";
import { RoleStatus } from "../constants/enums";

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  status: RoleStatus;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(RoleStatus),
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "roles",
  }
);

export const RoleModel = model<IRole>("Role", roleSchema);
