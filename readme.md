# POCUS Learning & Scan Log Mini-Platform
A full-stack training platform for POCUS (Point-of-Care Ultrasound).
Learners can enroll in courses and log scans. Faculty/Admins can manage courses and view analytics.

## 🧱 System Architecture Diagram

```
          +------------------------+
          |        USERS           |
          +-----------+------------+
                      |
                      v
     +----------------------------------------+
     |        AWS Amplify (Next.js Frontend)  |
     +--------------------+-------------------+
                          |
                          | HTTPS /api/*
                          v
          +------------------------------------------+
          |     CloudFront Reverse Proxy (HTTPS)     |
          +--------------------+---------------------+
                               |
                               v
       +---------------------------------------------+
       |  Elastic Beanstalk (Node.js Express API)    |
       +-------------------+-------------------------+
                           |
                           v
               +---------------------------+
               |     MongoDB Atlas         |
               +---------------------------+
```


## 🌐 Live Demo
Frontend (Amplify):  
https://master.d1q4nf9qlja1a8.amplifyapp.com/login

👥 Test Accounts (Seeded Users)
```
Admin:
  Email: admin@test.com
  Password: password123

Faculty:
  Email: faculty@test.com
  Password: password123

Learner:
  Email: learner@test.com
  Password: password123
```


## 🚀 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React Query (TanStack)
- TailwindCSS
- Hosted on AWS Amplify
- API calls routed through CloudFront HTTPS Proxy

### Backend
- Node.js + Express (TypeScript)
- MongoDB Atlas (Mongoose)
- JWT Authentication
- Zod validation
- Mongo aggregation pipelines (metrics)
- Deployed on AWS Elastic Beanstalk

### Infrastructure
- Amplify → Static Next.js application hosting
- CloudFront → Reverse proxy for /api/*
- Elastic Beanstalk → Node backend hosting
- MongoDB Atlas → Managed database
- GitHub Actions → Backend CI/CD deployment

## 📁 Monorepo Structure

```
pocus-platform/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      services/
      routes/
      validation/
      utils/
    tests/
    package.json

  frontend/
    app/
    components/
    api/
    lib/
    package.json
```

## ⚙️ Backend Setup

### 1️⃣ Install dependencies
```bash
cd backend
npm install
```

### 2️⃣ Environment Variables
Create backend/.env:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pocus
JWT_SECRET=super-secret-key
```

### Production (Elastic Beanstalk Environment Variables)
```
MONGO_URI=<Atlas connection string>
JWT_SECRET=<secure generated token>
CORS_ORIGIN=https://<AmplifyDomain>,https://<CloudFrontDomain>
```

### 3️⃣ Run backend in development mode
```bash
npm run dev
```

Backend runs at:
```
http://localhost:4000
```

## 🌱 Seed Database
```bash
npm run seed
```

Creates sample users and sample FAST course.

## 🧪 Run Backend Tests
```bash
npm test
```

## 🔌 Backend API Summary

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Courses
GET /api/courses  
POST /api/courses (faculty/admin)  
PATCH /api/courses/:id (faculty/admin)

### Enrollment
POST /api/enrollments  
GET /api/enrollments/me  

### Scan Logs
POST /api/scan-logs  
GET /api/scan-logs/me  
GET /api/scan-logs (faculty/admin)

### Metrics
GET /api/metrics/summary

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

## 🔧 Frontend Environment Variables
Create frontend/.env.local:

```
NEXT_PUBLIC_API_URL=https://<cloudfront-domain>/api
```

## 📦 Frontend Production Build
```bash
npm run build
```

## 📘 Deployment Notes

### Frontend (Amplify)
- Static Next.js deployment
- API routed through CloudFront

### Backend (Elastic Beanstalk)
- CI/CD with GitHub Actions
- Environment variables stored securely

### CloudFront
- /api/* → EB backend
- HTTPS enforced
- Caching disabled for API routes

### MongoDB
- Atlas IP allowlist includes EB servers and local IP

## 📙 Assumptions & Trade-offs

### Implemented:
- Clean controller/service separation  
- Zod validation per endpoint  
- JWT auth + RBAC
- Proper error handling middleware  
- Mongodb Aggregation pipelines
- Unit tests for core business logic  
- Automated backend deployment

### Trade-offs
- Because of interview time constraints, the system uses simple role-based access, not a granular ACL mechanism.
- Next.js frontend uses static export + client-side hydration, not full SSR, to ensure compatibility with Amplify Hosting.
- The backend is a single-node Elastic Beanstalk instance (sufficient for demo; in production multi-AZ load balancing is required).
- MongoDB Atlas networking uses IP allowlist for EB instance, not VPC peering (faster setup).
- Minimal error-handling and form validation included; can be expanded in production

### Future Enhancements
- Image upload to S3
- Audit logging
- CI for frontend
- Infrastructure as Code (CDK)

## 👨‍💻 Author
**Romeo Enso**  
Full-Stack Engineer — POCUS Learning Platform
