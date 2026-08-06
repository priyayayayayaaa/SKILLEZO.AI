import { Schema, model, Document, Types } from "mongoose";
import { SkillSource, EmploymentType } from "../constants/enums";

export interface IProfileSkill {
  name: string;
  level: number;
  yearsOfExperience: number;
  source: SkillSource;
  verified: boolean;
}

export interface IProfileEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date | null;
  currentlyStudying: boolean;
  grade?: string | null;
  description?: string | null;
}

export interface IProfileExperience {
  company: string;
  title: string;
  employmentType: EmploymentType;
  location: string;
  startDate: Date;
  endDate: Date | null;
  currentlyWorking: boolean;
  description: string;
  skills: string[];
}

export interface IProfileLinks {
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
}

export interface IProfileLocation {
  city: string;
  state: string;
  country: string;
}

export interface IProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  targetRoleId: Types.ObjectId | null;
  firstName: string;
  lastName: string;
  headline: string;
  bio: string;
  location: IProfileLocation;
  skills: IProfileSkill[];
  education: IProfileEducation[];
  experience: IProfileExperience[];
  links: IProfileLinks;
  completenessScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<IProfileLocation>(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const skillSchema = new Schema<IProfileSkill>(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 1, max: 5 },
    yearsOfExperience: { type: Number, required: true, min: 0 },
    source: {
      type: String,
      enum: Object.values(SkillSource),
      required: true,
      default: SkillSource.PROFILE,
    },
    verified: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const educationSchema = new Schema<IProfileEducation>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    currentlyStudying: { type: Boolean, required: true, default: false },
    grade: { type: String, default: null, trim: true },
    description: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const experienceSchema = new Schema<IProfileExperience>(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
      required: true,
    },
    location: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    currentlyWorking: { type: Boolean, required: true, default: false },
    description: { type: String, required: true, trim: true },
    skills: [{ type: String, trim: true }],
  },
  { _id: false }
);

const linksSchema = new Schema<IProfileLinks>(
  {
    linkedin: { type: String, default: null, trim: true },
    github: { type: String, default: null, trim: true },
    portfolio: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    targetRoleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      default: null,
      index: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    headline: { type: String, default: "", trim: true },
    bio: { type: String, default: "", trim: true },
    location: { type: locationSchema, required: true },
    skills: [skillSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    links: { type: linksSchema, default: {} },
    completenessScore: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    collection: "profiles",
  }
);

profileSchema.index({ "skills.name": 1 });

export const ProfileModel = model<IProfile>("Profile", profileSchema);
