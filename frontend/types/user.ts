export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'faculty' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}
