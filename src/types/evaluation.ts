
export interface Evaluation {
  id: number;
  title: string;
  type: 'formative' | 'summative';
  subject: string;
  level: string;
  maxScore: number;
  date: string;
  term: string;
  description?: string;
  questions: Question[];
  status: 'draft' | 'published' | 'archived';
}

export interface Question {
  id: number;
  type: 'multiple_choice' | 'short_answer' | 'essay' | 'fill_blank' | 'matching';
  text: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}
