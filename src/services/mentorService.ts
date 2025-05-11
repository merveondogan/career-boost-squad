
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
    });
    
    // Get user metadata for all profiles to supplement our mentor check
    const { data: authUsersData, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error("Error fetching user metadata:", authError);
      // Continue with what we have from profiles
    }
    
    // Create a map of user ids to their metadata for quick lookup
    const userMetadataMap = new Map();
    
    if (authUsersData?.user) {
      userMetadataMap.set(authUsersData.user.id, authUsersData.user.user_metadata);
    }
    
    // IMPORTANT: A profile is considered a mentor if:
    // 1. It has non-empty mentor_info data OR
    // 2. The corresponding user's metadata has is_mentor=true or user_type=mentor
    const mentorProfiles = profiles?.filter(profile => {
      // Check if profile has mentor_info data
      const hasMentorInfoObject = profile.mentor_info !== null && 
        typeof profile.mentor_info === 'object' &&
        Object.keys(profile.mentor_info).length > 0;
      
      // Check user metadata for mentor status
      const userMetadata = userMetadataMap.get(profile.id);
      const metadataIndicatesMentor = userMetadata && 
        (userMetadata.is_mentor === true || userMetadata.user_type === "mentor");
      
      // A profile is a mentor if it has mentor info OR metadata indicates they're a mentor
      const isMentor = hasMentorInfoObject || metadataIndicatesMentor;
      
      // Log detailed info about this profile's mentor status
      console.log(`Profile ${profile.id} (${profile.title}) mentor status:`);
      console.log(`- Has mentor_info object: ${hasMentorInfoObject}`);
      console.log(`- Metadata indicates mentor: ${metadataIndicatesMentor}`);
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
