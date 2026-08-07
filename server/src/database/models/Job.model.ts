import { Schema, model, Document, Types } from "mongoose";
import {
  JobEmploymentType,
  WorkplaceType,
  JobStatus,
  CompetencyImportance,
} from "@/core/constants/enums";

export interface IJobLocation {
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

export interface IJobRequiredSkill {
  name: string;
  requiredLevel: number;
  importance: CompetencyImportance;
  minYearsOfExperience?: number | null;
}

export interface IJobSalary {
  min?: number | null;
  max?: number | null;
  currency?: string | null;
}

export interface IJob extends Document {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  roleId: Types.ObjectId;
  createdBy: Types.ObjectId;
  title: string;
  description: string;
  employmentType: JobEmploymentType;
  workplaceType: WorkplaceType;
  location?: IJobLocation | null;
  requiredSkills: IJobRequiredSkill[];
  minExperienceYears: number;
  salary?: IJobSalary | null;
  status: JobStatus;
  publishedAt?: Date | null;
  closesAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<IJobLocation>(
  {
    city: { type: String, default: null, trim: true },
    state: { type: String, default: null, trim: true },
    country: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const requiredSkillSchema = new Schema<IJobRequiredSkill>(
  {
    name: { type: String, required: true, trim: true },
    requiredLevel: { type: Number, required: true, min: 1, max: 5 },
    importance: {
      type: String,
      enum: Object.values(CompetencyImportance),
      required: true,
      default: CompetencyImportance.MEDIUM,
    },
    minYearsOfExperience: { type: Number, default: null, min: 0 },
  },
  { _id: false }
);

const salarySchema = new Schema<IJobSalary>(
  {
    min: { type: Number, default: null, min: 0 },
    max: { type: Number, default: null, min: 0 },
    currency: { type: String, default: "USD", trim: true },
  },
  { _id: false }
);

const jobSchema = new Schema<IJob>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: Object.values(JobEmploymentType),
      required: true,
      index: true,
    },
    workplaceType: {
      type: String,
      enum: Object.values(WorkplaceType),
      required: true,
      index: true,
    },
    location: {
      type: locationSchema,
      default: null,
    },
    requiredSkills: [requiredSkillSchema],
    minExperienceYears: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    salary: {
      type: salarySchema,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(JobStatus),
      required: true,
      default: JobStatus.DRAFT,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    closesAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "jobs",
  }
);

jobSchema.index({ companyId: 1, status: 1 });
jobSchema.index({ roleId: 1, status: 1 });
jobSchema.index({ "location.city": 1 });
jobSchema.index({ createdAt: -1 });

export const JobModel = model<IJob>("Job", jobSchema);
