import { Schema, model, Document } from 'mongoose';

export type UserRole = 'learner' | 'faculty' | 'admin';

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['learner', 'faculty', 'admin'],
      default: 'learner',
    },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema);