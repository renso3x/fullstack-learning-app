import { Schema, model, Document } from 'mongoose';

export interface CourseDocument extends Document {
  title: string;
  description?: string;
  modality: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<CourseDocument>(
  {
    title: { type: String, required: true },
    description: String,
    modality: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

CourseSchema.index({ status: 1 });

export const CourseModel = model<CourseDocument>('Course', CourseSchema);
