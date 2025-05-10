
import { ChangeEvent } from "react";

export type MentorFormData = {
  fullName: string;
  company: string;
  position: string;
  expertiseAreas: string[];
  bio: string;
  hourlyRate: string;
  availability?: string[];
  internships: Internship[];
  education: Education;
};

export interface Internship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  major: string;
  graduationYear: string;
}

export interface MentorFormProps {
  formData: MentorFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleEducationChange: (education: Education) => void;
  handleInternshipChange: (internships: Internship[]) => void;
}

export interface MentoringSession {
  id: string;
  mentor_id: string;
  student_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}
