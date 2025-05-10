
import React, { ChangeEvent } from "react";
import MentorForm from "./MentorForm";
import { Education, Internship, MentorFormData } from "./form/types";

interface MentorFormWrapperProps {
  formData: MentorFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleEducationChange: (education: Education) => void;
  handleInternshipChange: (internships: Internship[]) => void;
}

const MentorFormWrapper: React.FC<MentorFormWrapperProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleEducationChange,
  handleInternshipChange
}) => {
  return (
    <MentorForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSelectChange={handleSelectChange}
      handleEducationChange={handleEducationChange}
      handleInternshipChange={handleInternshipChange}
    />
  );
};

export default MentorFormWrapper;
