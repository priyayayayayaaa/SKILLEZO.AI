import { Schema, model, Document, Types } from "mongoose";
import { ResumeStatus } from "../constants/enums";

export interface IResumePersonalInfo {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
}

export interface IResumeSkill {
  name: string;
  confidence: number;
}

export interface IResumeEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface IResumeExperience {
  company: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  skills: string[];
}

export interface IResumeProject {
  name: string;
  description: string | null;
  technologies: string[];
  url: string | null;
}

export interface IResumeCertification {
  name: string;
  issuer: string | null;
  issueDate: string | null;
  url: string | null;
}

export interface IResumeExtractedData {
  personalInfo?: IResumePersonalInfo;
  summary?: string | null;
  skills?: IResumeSkill[];
  education?: IResumeEducation[];
  experience?: IResumeExperience[];
  projects?: IResumeProject[];
  certifications?: IResumeCertification[];
  totalExperienceYears?: number | null;
  parserVersion?: string;
}

export interface IResume extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  fileUrl: string;
  fileName: string;
  mimeType: string;
  status: ResumeStatus;
  extractedData: IResumeExtractedData;
  parsingError: string | null;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const personalInfoSchema = new Schema<IResumePersonalInfo>(
  {
    fullName: { type: String, default: null, trim: true },
    email: { type: String, default: null, trim: true, lowercase: true },
    phone: { type: String, default: null, trim: true },
    location: { type: String, default: null, trim: true },
    linkedin: { type: String, default: null, trim: true },
    github: { type: String, default: null, trim: true },
    portfolio: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const skillSchema = new Schema<IResumeSkill>(
  {
    name: { type: String, required: true, trim: true },
    confidence: { type: Number, required: true, min: 0, max: 1 },
  },
  { _id: false }
);

const educationSchema = new Schema<IResumeEducation>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, default: null, trim: true },
    startDate: { type: String, default: null, trim: true },
    endDate: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const experienceSchema = new Schema<IResumeExperience>(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    startDate: { type: String, default: null, trim: true },
    endDate: { type: String, default: null, trim: true },
    description: { type: String, default: null, trim: true },
    skills: [{ type: String, trim: true }],
  },
  { _id: false }
);

const projectSchema = new Schema<IResumeProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },
    technologies: [{ type: String, trim: true }],
    url: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const certificationSchema = new Schema<IResumeCertification>(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, default: null, trim: true },
    issueDate: { type: String, default: null, trim: true },
    url: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const extractedDataSchema = new Schema<IResumeExtractedData>(
  {
    personalInfo: { type: personalInfoSchema, default: {} },
    summary: { type: String, default: null, trim: true },
    skills: [skillSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    totalExperienceYears: { type: Number, default: null },
    parserVersion: { type: String, default: "1.0", trim: true },
  },
  { _id: false }
);

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileUrl: { type: String, required: true, trim: true },
    fileName: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Object.values(ResumeStatus),
      required: true,
      default: ResumeStatus.UPLOADED,
      index: true,
    },
    extractedData: { type: extractedDataSchema, default: {} },
    parsingError: { type: String, default: null, trim: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "resumes",
  }
);

resumeSchema.index({ userId: 1, createdAt: -1 });

export const ResumeModel = model<IResume>("Resume", resumeSchema);
