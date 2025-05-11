
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
    console.log("Fetching mentor profiles...");
    
    // Fetch profiles that have mentor_info
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      throw error;
    }

    console.log("All profiles:", profiles);
    
    // Filter to only include profiles that have mentor_info
    const mentorProfiles = profiles?.filter(profile => {
      const hasMentorInfo = profile.mentor_info !== null && 
        typeof profile.mentor_info === 'object' &&
        Object.keys(profile.mentor_info).length > 0;
      
      console.log(`Profile ${profile.id} has mentor info: ${hasMentorInfo}`);
      return hasMentorInfo;
    });
    
    // Convert filtered profiles to mentor format
    const mentorsData = mentorProfiles?.map(convertProfileToMentor) || [];
    
    console.log(`Found ${mentorsData.length} real mentors out of ${profiles?.length || 0} total profiles`);
    
    return mentorsData;
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return [];
  }
};
