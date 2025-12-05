
import { Schema, model, Document, Types } from 'mongoose';

export interface ScanLogDocument extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  title: string;
  indication: string;
  dateOfScan: Date;
  location: string;
  notes: string;
  imageUrl?: string;
  createdAt: Date;
}

const ScanLogSchema = new Schema<ScanLogDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: String,
    indication: String,
    dateOfScan: Date,
    location: String,
    notes: String,
    imageUrl: String,
  },
  { timestamps: true }
);

ScanLogSchema.index({ userId: 1 });
ScanLogSchema.index({ courseId: 1 });
ScanLogSchema.index({ dateOfScan: 1 });

export const ScanLogModel = model<ScanLogDocument>('ScanLog', ScanLogSchema);
