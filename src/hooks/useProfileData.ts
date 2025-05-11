
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export interface ProfileData {
  mentor_info?: any;
  bio?: string;
  title?: string;
  location?: string;
  avatar_url?: string;
}

export const useProfileData = (user: User | null) => {
  const [isMentor, setIsMentor] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        setIsLoadingProfile(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error("Error fetching profile:", error);
            return;
          }
          
          setProfileData(data);
          
          // Check if user is a mentor based on mentor_info or user metadata
          const hasMentorInfo = data?.mentor_info && 
                               Object.keys(data?.mentor_info || {}).length > 0;
          
          const userMetadataIsMentor = user?.user_metadata?.is_mentor === true ||
                                     user?.user_metadata?.user_type === "mentor";
          
          // User is a mentor if they have mentor info OR their metadata indicates they are a mentor
          setIsMentor(hasMentorInfo || userMetadataIsMentor);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setIsLoadingProfile(false);
        }
      };
      
      fetchProfileData();
    } else {
      setIsLoadingProfile(false);
    }
  }, [user]);

  return { profileData, isMentor, setIsMentor, isLoadingProfile };
};
