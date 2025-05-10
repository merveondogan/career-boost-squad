
import { useState, ChangeEvent } from "react";
import MentorForm from "./MentorForm";
import { Education, Internship, MentorFormData } from "./form/types";

export const MentorFormWrapper = () => {
  const [formData, setFormData] = useState<MentorFormData>({
    fullName: "",
    position: "",
    company: "",
    bio: "",
    hourlyRate: "",
    education: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
    },
    internships: [],
    expertiseAreas: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (education: Education) => {
    setFormData((prev) => ({ ...prev, education }));
  };

  const handleInternshipChange = (internships: Internship[]) => {
    setFormData((prev) => ({ ...prev, internships }));
  };

  return <MentorForm 
    formData={formData}
    handleInputChange={handleInputChange}
    handleSelectChange={handleSelectChange}
    handleEducationChange={handleEducationChange}
    handleInternshipChange={handleInternshipChange}
  />;
};
