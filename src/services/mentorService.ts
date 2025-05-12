
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
    
    // Fetch ALL profiles from Supabase - without any user-specific filters
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      throw error;
    }

    console.log("All profiles:", profiles);
    
    // Filter profiles to identify mentors based on mentor_info
    const mentorProfiles = profiles?.filter(profile => {
      // Check if profile has mentor_info data
      const hasMentorInfoObject = profile.mentor_info !== null && 
        typeof profile.mentor_info === 'object' &&
        Object.keys(profile.mentor_info).length > 0;
      
      // A profile is considered a mentor if it has mentor info
      return hasMentorInfoObject;
    });
    
    // Convert filtered profiles to mentor format
    const mentorsData = mentorProfiles?.map(convertProfileToMentor) || [];
    
    console.log(`Found ${mentorsData.length} mentors out of ${profiles?.length || 0} total profiles`);
    console.log("Mentor profiles to display:", mentorsData);
    
    return mentorsData;
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return [];
  }
};
