
import { Button } from "@/components/ui/button";
import { ExpertiseSelector } from "./ExpertiseSelector";
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { ExperienceField } from "./form/ExperienceField";
import { RateField } from "./form/RateField";
import { EducationField } from "./form/EducationField";
import { InternshipsField } from "./form/InternshipsField";
import { useMentorForm } from "./form/useMentorForm";

export function MentorForm() {
  const {
    formData,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleExpertiseChange,
    handleEducationChange,
    handleInternshipChange,
    handleSubmit,
  } = useMentorForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <PersonalInfoFields 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleEducationChange={handleEducationChange}
        handleInternshipChange={handleInternshipChange}
      />
      
      <ExpertiseSelector 
        selectedAreas={formData.expertiseAreas}
        onChange={handleExpertiseChange}
      />
      
      <ExperienceField 
        formData={formData}
        handleSelectChange={handleSelectChange}
      />
      
      <EducationField
        education={formData.education}
        onChange={handleEducationChange}
      />
      
      <InternshipsField
        internships={formData.internships}
        onChange={handleInternshipChange}
      />
      
      <RateField 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
