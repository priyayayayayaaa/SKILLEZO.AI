import { Schema, model, Document, Types } from "mongoose";
import { ApplicationStatus } from "@/core/constants/enums";

export interface IApplicationStatusHistory {
  status: ApplicationStatus;
  changedAt: Date;
  changedBy?: string | null;
  reason?: string | null;
}

export interface IApplication extends Document {
  _id: Types.ObjectId;
  jobId: Types.ObjectId;
  userId: string;
  resumeId?: Types.ObjectId | null;
  status: ApplicationStatus;
  statusHistory: IApplicationStatusHistory[];
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const statusHistorySchema = new Schema<IApplicationStatusHistory>(
  {
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      required: true,
    },
    changedAt: { type: Date, default: Date.now, required: true },
    changedBy: {
      type: String,
      default: null,
    },
    reason: { type: String, default: null, trim: true },
  },
  { _id: false }
);

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      required: true,
      default: ApplicationStatus.APPLIED,
      index: true,
    },
    statusHistory: [statusHistorySchema],
    appliedAt: { type: Date, default: Date.now, required: true },
  },
  {
    timestamps: true,
    collection: "applications",
  }
);

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ userId: 1, status: 1 });
applicationSchema.index({ createdAt: -1 });

export const ApplicationModel = model<IApplication>("Application", applicationSchema);
