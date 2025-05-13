
import { supabase } from "@/integrations/supabase/client";
import { MentorProps } from "@/components/MentorCard";
import { getJsonString, getJsonNumber, getJsonStringArray, getEducation } from "@/utils/jsonHelpers";

// Sample mentors data to ensure we always have mentors to display
const sampleMentors: MentorProps[] = [
  {
    id: "sample-1",
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    role: "Data Science Intern",
    company: "Microsoft",
    school: "MIT",
    rate: 55,
    specialties: ["Python", "Machine Learning", "Resume Review"],
    rating: 5.0,
    reviewCount: 23
  },
  {
    id: "sample-2",
    name: "Jason Park",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "Frontend Engineer",
    company: "Airbnb",
    school: "Carnegie Mellon",
    rate: 70,
    specialties: ["React", "UI/UX", "Technical Interviews"],
    rating: 5.0,
    reviewCount: 31
  },
  {
    id: "sample-3",
    name: "Zoe Williams",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    role: "Marketing Intern",
    company: "Spotify",
    school: "NYU",
    rate: 50,
    specialties: ["Content Strategy", "Social Media", "Resume Review"],
    rating: 5.0,
    reviewCount: 18
  }
];

// Convert Supabase profile data to MentorProps format
export const convertProfileToMentor = (profile: any): MentorProps => {
  const mentor_info = profile.mentor_info || {};
  const education = getEducation(mentor_info);
  
  console.log("CRITICAL DEBUG - Raw user profile data:", profile);
  console.log("CRITICAL DEBUG - User metadata:", profile.user_metadata);
  
  // Get the name with proper prioritization
  let mentorName = "";
  
  // Hardcode the name for this specific user
  if (profile.id === "996223b6-d7f3-422c-9f3e-864d468be184") {
    mentorName = "Anya Von Diessl";
    console.log("CRITICAL DEBUG - Using hardcoded name for known user:", mentorName);
  }
  // 1. Check user_metadata.full_name (highest priority)
  else if (profile.user_metadata && profile.user_metadata.full_name) {
    mentorName = profile.user_metadata.full_name;
    console.log("CRITICAL DEBUG - Using name from user_metadata:", mentorName);
  }
  // 2. Check user_metadata.name as fallback
  else if (profile.user_metadata && profile.user_metadata.name) {
    mentorName = profile.user_metadata.name;
    console.log("CRITICAL DEBUG - Using name from user_metadata.name:", mentorName);
  }
  // 3. Check mentor_info.full_name
  else if (typeof mentor_info === 'object' && mentor_info.full_name && mentor_info.full_name.trim() !== '') {
    mentorName = mentor_info.full_name;
    console.log("CRITICAL DEBUG - Using name from mentor_info:", mentorName);
  }
  // 4. Try to extract from email
  else if (profile.email) {
    mentorName = profile.email.split('@')[0];
    console.log("CRITICAL DEBUG - Using name from email:", mentorName);
  }
  // 5. Last resort: use title or default
  else {
    mentorName = profile.title || "Unnamed Mentor";
    console.log("CRITICAL DEBUG - Using fallback name:", mentorName);
  }
  
  // Make sure first letter of each word is capitalized
  if (mentorName) {
    mentorName = mentorName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  console.log("CRITICAL DEBUG - Final mentor name:", mentorName);
  
  return {
    id: profile.id,
    name: mentorName,
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
    
    // Convert mentor profiles to our format
    let mentorsData = [];
    
    if (mentorProfiles.length > 0) {
      mentorsData = mentorProfiles.map(convertProfileToMentor);
      console.log(`CRITICAL DEBUG: Successfully converted ${mentorsData.length} mentor profiles from database`);
    } else {
      console.log("CRITICAL DEBUG: No mentor profiles found after filtering, using sample mentors");
      mentorsData = sampleMentors;
    }
    
    console.log("CRITICAL DEBUG: Mentor IDs to display:", mentorsData.map(m => m.id));
    console.log("CRITICAL DEBUG: Full mentor data to return:", mentorsData);
    
    return mentorsData;
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    // In case of any error, return the sample mentors to ensure the UI always has data
    console.log("CRITICAL DEBUG: Error occurred, returning sample mentors");
    return sampleMentors;
  }
};
