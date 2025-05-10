
import { Button } from "@/components/ui/button";
import { ExpertiseSelector } from "./ExpertiseSelector";
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { ExperienceField } from "./form/ExperienceField";
import { RateField } from "./form/RateField";
import { useMentorForm } from "./form/useMentorForm";

export function MentorForm() {
  const {
    formData,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleExpertiseChange,
    handleSubmit,
  } = useMentorForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoFields 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
      
      <ExpertiseSelector 
        selectedAreas={formData.expertiseAreas}
        onChange={handleExpertiseChange}
      />
      
      <ExperienceField 
        formData={formData}
        handleSelectChange={handleSelectChange}
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
