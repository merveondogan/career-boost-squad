
import { supabase } from "@/integrations/supabase/client";
import { MentorProps } from "@/components/MentorCard";
import { getJsonString, getJsonNumber, getJsonStringArray, getEducation } from "@/utils/jsonHelpers";

// Sample mentor data for fallback
export const sampleMentors: MentorProps[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Software Engineer Intern",
    company: "Google",
    school: "Stanford University",
    rate: 60,
    specialties: ["Resume Review", "Mock Interview", "Technical Prep"],
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Product Manager",
    company: "Meta",
    school: "UC Berkeley",
    rate: 75,
    specialties: ["Product Case Studies", "PM Interview Prep", "Resume Review"],
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: "3",
    name: "Sophia Patel",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Business Analyst Intern",
    company: "BCG",
    school: "Harvard University",
    rate: 65,
    specialties: ["Case Interviews", "Resume Review", "Career Strategy"],
    rating: 5.0,
    reviewCount: 32
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Data Science Intern",
    company: "Amazon",
    school: "MIT",
    rate: 70,
    specialties: ["Data Analysis", "Technical Interview", "Resume Review"],
    rating: 4.7,
    reviewCount: 15
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    role: "UX Design Intern",
    company: "Apple",
    school: "Rhode Island School of Design",
    rate: 55,
    specialties: ["Portfolio Review", "Design Challenge", "Interview Prep"],
    rating: 4.9,
    reviewCount: 21
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    role: "Investment Banking Analyst",
    company: "Morgan Stanley",
    school: "University of Pennsylvania",
    rate: 80,
    specialties: ["Technical Questions", "Resume Review", "Interview Prep"],
    rating: 4.8,
    reviewCount: 14
  },
  {
    id: "7",
    name: "Taylor Swift",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    role: "Music Production Intern",
    company: "Republic Records",
    school: "Berklee College of Music",
    rate: 90,
    specialties: ["Music Business", "Songwriting", "Artist Development"],
    rating: 5.0,
    reviewCount: 89
  }
];

export const fetchMentors = async () => {
  try {
    console.log("Fetching mentor profiles...");
    
    // Log the current user to help with debugging
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Current user:", user?.id, user?.email, user?.user_metadata);
    
    // First, fetch all profiles to check if any mentors exist
    const { data: allProfiles, error: profileError } = await supabase
      .from('profiles')
      .select('*');
      
    if (profileError) {
      throw profileError;
    }
    
    console.log("All profiles:", allProfiles); // Debug all profiles
    
    // Specifically fetch profiles with mentor_info that is not null
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .not('mentor_info', 'is', null);
      
    if (error) {
      throw error;
    }
    
    console.log("Fetched mentor profiles:", data);
    console.log("Mentor profiles count:", data?.length || 0);
    
    // Check profiles with mentor_info that might be empty objects
    const profilesWithMentorInfo = allProfiles?.filter(p => {
      const hasInfo = p.mentor_info !== null && typeof p.mentor_info === 'object';
      console.log(`Profile ${p.id} has mentor info: ${hasInfo}`);
      if (hasInfo) {
        console.log(`Mentor info for ${p.id}:`, p.mentor_info);
      }
      return hasInfo;
    });
    console.log("Profiles with any mentor_info:", profilesWithMentorInfo);
    
    if (data && data.length > 0) {
      // Transform Supabase profile data to MentorProps format with improved handling
      const mentorsData = data.map(profile => {
        console.log(`Processing mentor ${profile.id}:`, profile.mentor_info);
        
        return {
          id: profile.id,
          name: getJsonString(profile.mentor_info, 'full_name', profile?.title || "Unnamed Mentor"),
          avatar: profile.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
          role: getJsonString(profile.mentor_info, 'position', profile.title || "Mentor"),
          company: getJsonString(profile.mentor_info, 'company', "Unknown"),
          school: getEducation(profile.mentor_info).school || "Unknown",
          rate: getJsonNumber(profile.mentor_info, 'hourly_rate', 50),
          specialties: getJsonStringArray(profile.mentor_info, 'expertise_areas', ["General Mentoring"]),
          rating: 5.0, // Default rating for now
          reviewCount: 0  // Default review count for now
        };
      });
      
      console.log("Transformed mentor data:", mentorsData);
      return mentorsData;
    } else {
      // Enhanced fallback logic - try to extract any profile with some mentor_info
      const anyMentorProfiles = allProfiles?.filter(p => {
        const hasNonEmptyInfo = p.mentor_info !== null && 
          typeof p.mentor_info === 'object' && 
          Object.keys(p.mentor_info).length > 0;
        
        if (hasNonEmptyInfo) {
          console.log(`Found potential mentor in profile ${p.id}:`, p.mentor_info);
        }
        
        return hasNonEmptyInfo;
      });
      
      console.log("Found any mentor profiles:", anyMentorProfiles);
      
      if (anyMentorProfiles && anyMentorProfiles.length > 0) {
        const backupMentorsData = anyMentorProfiles.map(profile => {
          return {
            id: profile.id,
            name: getJsonString(profile.mentor_info, 'full_name', profile?.title || "Unnamed Mentor"),
            avatar: profile.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
            role: getJsonString(profile.mentor_info, 'position', profile.title || "Mentor"),
            company: getJsonString(profile.mentor_info, 'company', "Unknown"),
            school: getEducation(profile.mentor_info).school || "Unknown",
            rate: getJsonNumber(profile.mentor_info, 'hourly_rate', 50),
            specialties: getJsonStringArray(profile.mentor_info, 'expertise_areas', ["General Mentoring"]),
            rating: 5.0,
            reviewCount: 0
          };
        });
        
        console.log("Backup mentor data:", backupMentorsData);
        return backupMentorsData;
      } else {
        console.log("No mentors found in any format, using sample data");
        return sampleMentors;
      }
    }
  } catch (error: any) {
    console.error("Error fetching mentors:", error.message);
    return sampleMentors;
  }
};
