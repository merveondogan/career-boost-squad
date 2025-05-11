
import { Education } from "./types";
import { EducationForm } from "./education/EducationForm";

interface EducationFieldProps {
  education: Education;
  onChange: (education: Education) => void;
}

export const EducationField = ({ 
  education,
  onChange
}: EducationFieldProps) => {
  return <EducationForm education={education} onChange={onChange} />;
};
