
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
    
    // Fetch profiles from Supabase
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      throw error;
    }

    console.log("All profiles:", profiles);
    
    // Get user metadata from auth to check for mentor status
    const { data: { user } } = await supabase.auth.getUser();
    
    // Filter profiles - include a profile as mentor if:
    // 1. It has mentor_info that is not null and has properties, OR
    // 2. The user metadata indicates they are a mentor (is_mentor: true)
    const mentorProfiles = profiles?.filter(profile => {
      // Check mentor_info
      const hasMentorInfoObject = profile.mentor_info !== null && 
        typeof profile.mentor_info === 'object' &&
        Object.keys(profile.mentor_info).length > 0;
      
      // If viewing own profile and user is logged in and is the current profile
      const isOwnProfile = user && user.id === profile.id;
      
      // Check user metadata for mentor status (if it's the current user)
      const hasMetadataAsMentor = isOwnProfile && 
        user?.user_metadata && 
        user.user_metadata.is_mentor === true;
      
      const isMentor = hasMentorInfoObject || hasMetadataAsMentor;
      console.log(`Profile ${profile.id} is a mentor: ${isMentor} (info: ${hasMentorInfoObject}, metadata: ${hasMetadataAsMentor})`);
      return isMentor;
    });
    
    // Convert filtered profiles to mentor format
    const mentorsData = mentorProfiles?.map(convertProfileToMentor) || [];
    
    console.log(`Found ${mentorsData.length} mentors out of ${profiles?.length || 0} total profiles`);
    
    return mentorsData;
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return [];
  }
};
