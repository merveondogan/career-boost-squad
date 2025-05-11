
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
    
    // Fetch profiles from Supabase - get ALL profiles
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      throw error;
    }

    console.log("All profiles:", profiles);
    
    // More aggressive debugging of profile data to see what's happening
    profiles?.forEach(profile => {
      console.log(`Examining profile ${profile.id}:`);
      console.log(`- Title: ${profile.title}`);
      console.log(`- mentor_info:`, profile.mentor_info);
      console.log(`- is_mentor flag: ${profile.is_mentor}`);
    });
    
    // IMPORTANT: Filter profiles to only include users who have mentor_info OR
    // have been flagged as mentors in the profile with the is_mentor field
    const mentorProfiles = profiles?.filter(profile => {
      // Check if profile has mentor_info data
      const hasMentorInfoObject = profile.mentor_info !== null && 
        typeof profile.mentor_info === 'object' &&
        Object.keys(profile.mentor_info).length > 0;
      
      // Check if profile has is_mentor flag set to true
      const isFlaggedAsMentor = profile.is_mentor === true;
      
      // A profile is a mentor if it has mentor info OR is flagged as a mentor
      const isMentor = hasMentorInfoObject || isFlaggedAsMentor;
      
      // Log detailed info about this profile's mentor status
      console.log(`Profile ${profile.id} (${profile.title}) mentor status:`);
      console.log(`- Has mentor_info object: ${hasMentorInfoObject}`);
      console.log(`- Is flagged as mentor: ${isFlaggedAsMentor}`);
      console.log(`- Final mentor status: ${isMentor}`);
      
      return isMentor;
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
