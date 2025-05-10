
import { ChangeEvent } from "react";

export type MentorFormData = {
  company: string;
  position: string;
  expertiseAreas: string[];
  experience: string;
  bio: string;
  hourlyRate: string;
};

export interface MentorFormProps {
  formData: MentorFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}
