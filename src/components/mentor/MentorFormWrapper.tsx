
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MentorForm from "./MentorForm";
import { Education, Internship, MentorFormData } from "./form/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Json } from "@/integrations/supabase/types";

export const MentorFormWrapper = () => {
  const [formData, setFormData] = useState<MentorFormData>({
    fullName: "",
    position: "",
    company: "",
    bio: "",
    hourlyRate: "",
    experience: "",
    education: {
      school: "",
      major: "",
      graduationYear: "",
    },
    internships: [],
    expertiseAreas: [],
  });

  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "expertiseAreas") {
      // Handle comma-separated string for expertise areas
      setFormData((prev) => ({ ...prev, [name]: value.split(",").filter(Boolean) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEducationChange = (education: Education) => {
    setFormData((prev) => ({ ...prev, education }));
  };

  const handleInternshipChange = (internships: Internship[]) => {
    setFormData((prev) => ({ ...prev, internships }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to submit the mentor form",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert form data to mentor_info structure that's compatible with Json type
      const mentorInfo: Json = {
        full_name: formData.fullName,
        company: formData.company,
        position: formData.position,
        expertise_areas: formData.expertiseAreas,
        bio: formData.bio,
        hourly_rate: formData.hourlyRate,
        experience: formData.experience,
        education: {
          school: formData.education.school,
          major: formData.education.major,
          graduation_year: formData.education.graduationYear
        },
        internships: formData.internships.map(i => ({
          id: i.id,
          company: i.company,
          role: i.role,
          start_date: i.startDate,
          end_date: i.endDate,
          description: i.description
        }))
      };
      
      // Update the user's profile with mentor information - don't use is_mentor field
      const { error } = await supabase
        .from('profiles')
        .update({
          mentor_info: mentorInfo
        })
        .eq('id', user.id);
        
      if (error) throw error;

      // Update user metadata to mark as mentor
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          is_mentor: true,
          user_type: 'mentor'
        }
      });
      
      if (updateError) throw updateError;
      
      toast({
        title: "Success!",
        description: "Your mentor profile has been created. You are now visible in the mentors list.",
      });
      
      // Redirect to profile page
      navigate('/profile');
      
    } catch (error: any) {
      console.error("Error submitting mentor form:", error.message);
      toast({
        variant: "destructive",
        title: "Error submitting form",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Pass down all required props to MentorForm
  return (
    <MentorForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSelectChange={handleSelectChange}
      handleEducationChange={handleEducationChange}
      handleInternshipChange={handleInternshipChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default MentorFormWrapper;
