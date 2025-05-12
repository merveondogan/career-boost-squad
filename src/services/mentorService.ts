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
    console.log("CRITICAL DEBUG: Starting to fetch ALL mentor profiles without restrictions");
    
    // Fetch ALL profiles from Supabase that have mentor_info
    // IMPORTANT - NOT filtering by current user ID to see all mentors
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      console.error("CRITICAL ERROR in fetching mentors:", error.message);
      throw error;
    }

    console.log("CRITICAL DEBUG: Raw profiles from database (all):", profiles);
    
    // Filter profiles with mentor_info after fetching all profiles
    // IMPORTANT - Only keeping profiles that have mentor_info JSON with at least one key
    const mentorProfiles = profiles?.filter(profile => 
      profile.mentor_info && 
      typeof profile.mentor_info === 'object' && 
      Object.keys(profile.mentor_info).length > 0
    ) || [];
    
    console.log(`CRITICAL DEBUG: Filtered ${mentorProfiles.length} profiles with mentor_info`);
    console.log("CRITICAL DEBUG: Mentor profiles after filtering:", mentorProfiles);
    
    if (mentorProfiles.length === 0) {
      console.log("CRITICAL DEBUG: No mentor profiles found after filtering");
      return [];
    }
    
    // Convert mentor profiles to our format
    const mentorsData = mentorProfiles.map(convertProfileToMentor);
    
    console.log(`CRITICAL DEBUG: Successfully converted ${mentorsData.length} mentor profiles`);
    console.log("CRITICAL DEBUG: Mentor IDs to display:", mentorsData.map(m => m.id));
    console.log("CRITICAL DEBUG: Full mentor data to return:", mentorsData);
    
    return mentorsData;
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return [];
  }
};
