import { Schema, model, Document, Types } from "mongoose";
import { CompanySize, CompanyVerificationStatus } from "../constants/enums";

export interface ILocation {
  city: string;
  state: string;
  country: string;
}

export interface ICompany extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  industry: string;
  website: string;
  logoUrl: string;
  location: ILocation;
  companySize: CompanySize;
  verificationStatus: CompanyVerificationStatus;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<ILocation>(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const companySchema = new Schema<ICompany>(
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
    industry: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    companySize: {
      type: String,
      enum: Object.values(CompanySize),
      required: true,
    },
    verificationStatus: {
      type: String,
      enum: Object.values(CompanyVerificationStatus),
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "companies",
  }
);

companySchema.index({ "location.city": 1 });

export const CompanyModel = model<ICompany>("Company", companySchema);
