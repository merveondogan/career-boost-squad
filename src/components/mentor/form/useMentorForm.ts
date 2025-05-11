
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { MentorFormData, Education, Internship } from "./types";

export function useMentorForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<MentorFormData>({
    fullName: "",
    company: "",
    position: "",
    expertiseAreas: [],
    experience: "",
    bio: "",
    hourlyRate: "",
    internships: [],
    education: {
      school: "",
      major: "",
      graduationYear: ""
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleExpertiseChange = (expertiseAreas: string[]) => {
    setFormData((prev) => ({ ...prev, expertiseAreas }));
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
        description: "You need to be logged in to become a mentor.",
      });
      navigate("/login");
      return;
    }
    
    if (formData.expertiseAreas.length === 0) {
      toast({
        variant: "destructive",
        title: "Areas of expertise required",
        description: "Please select at least one area of expertise.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update user metadata to include mentor status
      const { error: userUpdateError } = await supabase.auth.updateUser({
        data: {
          user_type: "mentor",
          is_mentor: true
        }
      });

      if (userUpdateError) throw userUpdateError;
      
      // Prepare mentor_info object
      const mentorInfo = {
        company: formData.company,
        position: formData.position,
        expertise_areas: formData.expertiseAreas,
        experience: formData.experience,
        hourly_rate: formData.hourlyRate,
        education: {
          school: formData.education.school,
          major: formData.education.major,
          graduation_year: formData.education.graduationYear
        },
        internships: formData.internships.map(internship => ({
          id: internship.id,
          company: internship.company,
          role: internship.role,
          start_date: internship.startDate,
          end_date: internship.endDate,
          description: internship.description
        }))
      };
      
      // Create or update mentor profile in database
      // CRITICAL: Make sure to set is_mentor: true in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          id: user.id,
          title: formData.position,
          bio: formData.bio,
          mentor_info: mentorInfo,
          is_mentor: true  // This ensures the profile is flagged as a mentor in the profiles table
        })
        .eq('id', user.id);

      if (profileError) throw profileError;
      
      toast({
        title: "Application submitted successfully",
        description: "Your mentor profile has been created. You are now visible in the mentors list.",
      });
      
      // Refresh the page to update the UI with the new mentor status
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      // Redirect to profile page
      navigate("/profile");
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting application",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleExpertiseChange,
    handleEducationChange,
    handleInternshipChange,
    handleSubmit,
  };
}
