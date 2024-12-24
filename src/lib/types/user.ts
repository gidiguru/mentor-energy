// src/lib/types/user.ts
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'mentor';
    university?: string;
    specialization?: string;
    yearLevel?: string;
    company?: string;
    position?: string;
    expertise?: string[];
    createdAt: Date;
    updatedAt: Date;
}

// You can update the auth store to import this type instead of defining it inline