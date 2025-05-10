
import { ChangeEvent } from "react";

export type MentorFormData = {
  company: string;
  position: string;
  expertiseAreas: string[];
  experience: string;
  bio: string;
  hourlyRate: string;
  availability?: string[];
};

export interface MentorFormProps {
  formData: MentorFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
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
