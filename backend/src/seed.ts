import { connectDb } from './config/db';
import { UserModel } from './models/user.model';
import { CourseModel } from './models/course.model';
import bcrypt from 'bcryptjs';

async function seed() {
  await connectDb();

  await UserModel.deleteMany({});
  await CourseModel.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await UserModel.create({
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash,
    role: 'admin',
  });

  const faculty = await UserModel.create({
    name: 'Faculty User',
    email: 'faculty@example.com',
    passwordHash,
    role: 'faculty',
  });

  const learner = await UserModel.create({
    name: 'Learner User',
    email: 'learner@example.com',
    passwordHash,
    role: 'learner',
  });

  const course1 = await CourseModel.create({
    title: 'FAST Exam',
    description: 'Focused abdominal ultrasound',
    modality: 'Abdominal',
    status: 'active',
  });

  console.log('Seeded:');
  console.log({ admin, faculty, learner, course1 });

  process.exit(0);
}

seed();
