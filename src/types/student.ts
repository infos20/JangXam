
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  class: string;
  level: string;
  photo?: string;
  parentContact: string;
  address?: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'transferred';
}

export interface Attendance {
  id: number;
  studentId: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  reason?: string;
}

export interface Grade {
  id: number;
  studentId: number;
  subjectId: number;
  evaluationId: number;
  term: string; // "Trimestre 1", "Trimestre 2", "Trimestre 3"
  score: number;
  maxScore: number;
  feedback?: string;
  date: string;
}

export interface StudentProgress {
  id: number;
  studentId: number;
  competency: string;
  level: 'not_acquired' | 'in_progress' | 'acquired' | 'mastered';
  comments?: string;
  date: string;
}

export interface Subject {
  id: number;
  name: string;
  code?: string;
}
