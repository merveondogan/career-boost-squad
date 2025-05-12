
import { supabase } from "@/integrations/supabase/client";
import { MentorProps } from "@/components/MentorCard";
import { getJsonString, getJsonNumber, getJsonStringArray, getEducation } from "@/utils/jsonHelpers";

// Convert Supabase profile data to MentorProps format
export const convertProfileToMentor = (profile: any): MentorProps => {
  const mentor_info = profile.mentor_info || {};
  const education = getEducation(mentor_info);
  
  return {
    id: profile.id,
    name: profile.title || "Unnamed Mentor",
    avatar: profile.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
    role: profile.title || "Mentor",
    company: typeof mentor_info === 'object' && mentor_info.company ? 
      mentor_info.company : "Mentor Connect",
    school: education.school || "Not specified",
    rate: typeof mentor_info === 'object' ? 
      getJsonNumber(mentor_info, 'hourly_rate', 50) : 
      50,
    specialties: typeof mentor_info === 'object' ? 
      getJsonStringArray(mentor_info, 'expertise_areas', ["General Mentoring"]) : 
      ["General Mentoring"],
    rating: 5.0, // Default rating for now
    reviewCount: 0  // Default review count for now
  };
};

export const fetchMentors = async () => {
  try {
    console.log("DEBUGGING: Fetching ALL mentor profiles...");
    
    // Fetch ALL profiles from Supabase that have mentor_info without any filtering
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .not('mentor_info', 'is', null);
      
    if (error) {
      throw error;
    }

    console.log("DEBUGGING: Raw profiles from database:", profiles);
    
    if (!profiles || profiles.length === 0) {
      console.log("DEBUGGING: No mentor profiles found in database");
      return [];
    }
    
    // Convert all mentor profiles to our format
    const mentorsData = profiles.map(convertProfileToMentor);
    
    console.log(`DEBUGGING: Successfully converted ${mentorsData.length} mentor profiles`);
    console.log("DEBUGGING: Mentor profiles to display:", mentorsData);
    
    return mentorsData;
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return [];
  }
};
