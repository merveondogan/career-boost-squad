
import { supabase } from "@/integrations/supabase/client";
import { MentorProps } from "@/components/MentorCard";
import { getJsonString, getJsonNumber, getJsonStringArray, getEducation } from "@/utils/jsonHelpers";

// Convert Supabase profile data to MentorProps format
export const convertProfileToMentor = (profile: any): MentorProps => {
  const mentor_info = profile.mentor_info || {};
  const education = getEducation(mentor_info);
  
  return {
    id: profile.id,
    name: typeof mentor_info === 'object' ? 
      getJsonString(mentor_info, 'full_name', profile?.title || "Unnamed Mentor") : 
      profile?.title || "Unnamed Mentor",
    avatar: profile.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
    role: typeof mentor_info === 'object' ? 
      getJsonString(mentor_info, 'position', profile.title || "Mentor") : 
      profile.title || "Mentor",
    company: typeof mentor_info === 'object' ? 
      getJsonString(mentor_info, 'company', "Unknown") : 
      "Unknown",
    school: education.school || "Unknown",
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
    console.log("Fetching mentor profiles...");
    
    // First fetch profiles with any mentor_info
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      throw error;
    }

    console.log("All profiles:", profiles);
    
    // Filter profiles that have mentor_info and convert to mentor format
    const mentorsData = profiles
      ?.filter(profile => {
        // Check if mentor_info exists and is not null
        const hasMentorInfo = profile.mentor_info !== null && 
          typeof profile.mentor_info === 'object' && 
          Object.keys(profile.mentor_info).length > 0;
        
        console.log(`Profile ${profile.id} has mentor info: ${hasMentorInfo}`);
        
        return hasMentorInfo;
      })
      .map(convertProfileToMentor);
    
    console.log(`Found ${mentorsData?.length || 0} real mentors`);
    
    if (mentorsData && mentorsData.length > 0) {
      return mentorsData;
    } else {
      console.log("No real mentors found, returning empty array");
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return [];
  }
};
