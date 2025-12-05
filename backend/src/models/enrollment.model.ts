import { Schema, model, Document, Types } from 'mongoose';

export interface EnrollmentDocument extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  status: 'enrolled' | 'completed';
  enrolledAt: Date;
  completedAt?: Date;
}

const EnrollmentSchema = new Schema<EnrollmentDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    status: {
      type: String,
      enum: ['enrolled', 'completed'],
      default: 'enrolled',
    },
    completedAt: Date,
  },
  {
    timestamps: { createdAt: 'enrolledAt', updatedAt: false },
  }
);

EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const EnrollmentModel = model<EnrollmentDocument>(
  'Enrollment',
  EnrollmentSchema
);
