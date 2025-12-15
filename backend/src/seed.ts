import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDb } from './config/db';
import { UserModel } from './models/user.model';
import { CourseModel } from './models/course.model';

async function seed() {
  try {
    await connectDb();

    // 🔒 Safety check — never seed prod by accident
    if (process.env.NODE_ENV === 'production') {
      throw new Error('❌ Seeding is disabled in production');
    }

    console.log('🧹 Dropping database...');
    await mongoose.connection.dropDatabase();

    const passwordHash = await bcrypt.hash('password123', 10);

    const admin = await UserModel.create({
      name: 'Admin User',
      email: 'admin@test.com',
      passwordHash,
      role: 'admin',
    });

    const faculty = await UserModel.create({
      name: 'Faculty User',
      email: 'faculty@test.com',
      passwordHash,
      role: 'faculty',
    });

    const learner = await UserModel.create({
      name: 'Learner User',
      email: 'learner@test.com',
      passwordHash,
      role: 'learner',
    });

    const courses = [
      {
        title: 'FAST Exam',
        description: 'Focused Assessment with Sonography in Trauma',
        modality: 'POCUS',
        status: 'active',
      },
      {
        title: 'Abdominal POCUS',
        description: 'Core abdominal ultrasound scanning',
        modality: 'POCUS',
        status: 'active',
      },
      {
        title: 'Cardiac POCUS',
        description: 'Basic cardiac ultrasound views',
        modality: 'POCUS',
        status: 'active',
      },
    ];

    await CourseModel.insertMany(courses);

    console.log('✅ Database seeded successfully');
    console.log({
      admin: admin.email,
      faculty: faculty.email,
      learner: learner.email,
      courses: courses.map((c) => c.title),
    });
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
