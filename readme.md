# POCUS Learning & Scan Log Mini-Platform  
A full-stack web application for POCUS (Point-of-Care Ultrasound) training.  
Learners can enroll in courses and log scans; faculty/admins can view metrics, learners, and logs.

---

## 🚀 Tech Stack

### **Backend**
- Node.js + Express  
- TypeScript  
- MongoDB (Mongoose)  
- JWT Authentication  
- Zod Validation  
- Mongo Aggregations for Metrics  

### **Frontend**
- React (Vite + TypeScript)  
- React Router  
- React Query (API fetching)  
- TailwindCSS (light styling)

### **Deployment**
- MongoDB Atlas  
- AWS S3 (Frontend hosting)  
- AWS EC2 / Elastic Beanstalk / Lambda (Backend API)

---

# 📁 Project Structure

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
  frontend/
    src/
      pages/
      components/
      api/
      routing/
```

---

# ⚙️ Backend Setup

## 1️⃣ **Install dependencies**

```
cd backend
npm install
```

---

## 2️⃣ **Environment Variables**

Create `.env` in `/backend`:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/pocus
JWT_SECRET=super-secret-key
```

For production:

- Use MongoDB Atlas connection string  
- Store JWT secret in AWS SSM or EB environment variables  

---

## 3️⃣ **Run backend (with auto-reload)**

### ✔ Recommended: `ts-node-dev` (already installed)

`backend/package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "seed": "ts-node-dev src/seed.ts",
  "test": "jest --runInBand"
}
```

### Start in development mode:

```
npm run dev
```

This gives you:
- automatic reload on file changes  
- fast TypeScript execution  
- no rebuild needed  

---

# 🌱 Seeding the Database

The backend ships with a sample seed script:

```
npm run seed
```

This creates:

- 1 Admin  
- 1 Faculty  
- 1 Learner  
- 1 FAST Exam course  

Credentials are displayed after seeding.

---

# 🧪 Run Tests

Memory-backed Mongo tests via MongoMemoryServer:

```
npm test
```

Test suites include:
- Auth service  
- Enrollment service  
- Scan Log service  

---

# 🔌 Backend API Endpoints (Summary)

### **Auth**
```
POST /api/auth/register
POST /api/auth/login
```

### **Courses**
```
GET    /api/courses
POST   /api/courses          (faculty/admin)
PATCH  /api/courses/:id      (faculty/admin)
```

### **Enrollments**
```
POST /api/enrollments        (learner)
GET  /api/enrollments/me     (learner)
```

### **Scan Logs**
```
POST /api/scan-logs          (learner)
GET  /api/scan-logs/me       (learner)
GET  /api/scan-logs          (faculty/admin)
```

### **Metrics**
```
GET /api/metrics/summary     (faculty/admin)
```

---

# 🧱 Backend Architecture Diagram

```
   +-------------+        +-------------------+
   |   Frontend  | -----> |  API Gateway/EC2  |
   |   React     |        |  Node + Express   |
   +-------------+        +---------+---------+
                                   |
                                   v
                        +----------------------+
                        |   MongoDB (Atlas)    |
                        | users/courses/scans  |
                        +----------------------+
```

---

# 🎨 Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 📦 Frontend Build

```
npm run build
```

Deploy `/dist` to:

- AWS S3  
- CloudFront (recommended)  

---

# 📘 Notes & Trade-offs

### Implemented:
- Clean controller/service separation  
- Zod validation per endpoint  
- Role-based access control (RBAC)  
- Proper error handling middleware  
- Mongo aggregation pipelines  
- Unit tests for core business logic  
- Developer-friendly hot reload  

### Future Enhancements:
- File uploads (scan images → S3)  
- Full audit logging  
- Role management UI  
- CI/CD pipeline (GitHub Actions + EB deploy)  
- Terraform or CDK infrastructure  

---

# 👨‍💻 Developer Experience

### Hot reload enabled using:

```
ts-node-dev --respawn --transpile-only
```

You modify any `.ts` file → backend restarts instantly.

### File Watching Optimization

If needed on Windows/macOS:

```
export TS_NODE_DEV_PRETTY=true
export TS_NODE_DEV_LOG_ERROR=true
```

---

# 🙌 Author  
Romeo — Full-Stack Engineer  
POCUS Learning Platform (Mini-Project)
