
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

  // Pass down all required props to MentorForm
  const formProps = {
    formData,
    handleInputChange,
    handleSelectChange,
    handleEducationChange,
    handleInternshipChange
  };

  return <MentorForm {...formProps} />;
};

export default MentorFormWrapper;
