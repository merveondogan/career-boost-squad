
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { ExperienceField } from "./form/ExperienceField";
import { InternshipsField } from "./form/InternshipsField";
import { EducationField } from "./form/EducationField";
import { RateField } from "./form/RateField";
import { ExpertiseSelector } from "./ExpertiseSelector";
import { MentorFormProps } from "./form/types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ExtendedMentorFormProps extends MentorFormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

const MentorForm = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleEducationChange,
  handleInternshipChange,
  handleSubmit,
  isSubmitting
}: ExtendedMentorFormProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login?redirect=become-mentor");
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {!user && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You need to be logged in to become a mentor. 
            Please <a href="/login?redirect=become-mentor" className="font-medium underline">login</a> or 
            <a href="/signup?type=mentor" className="font-medium underline ml-1">sign up</a> first.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <PersonalInfoFields 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Experience & Expertise</h2>
        <ExperienceField 
          formData={formData} 
          handleSelectChange={handleSelectChange} 
        />
        
        <ExpertiseSelector
          selected={formData.expertiseAreas}
          onChange={(areas) => handleSelectChange("expertiseAreas", areas)}
        />
      </div>
      
      <div>
        <InternshipsField 
          internships={formData.internships}
          onChange={handleInternshipChange} 
        />
      </div>
      
      <div>
        <EducationField 
          education={formData.education} 
          onChange={handleEducationChange} 
        />
      </div>
      
      <div>
        <RateField 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
      </div>
      
      <div className="pt-6 border-t">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || !user}
        >
          {isSubmitting ? "Creating Profile..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
};

export default MentorForm;
