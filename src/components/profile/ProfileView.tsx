
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Pen } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import { User } from "@supabase/supabase-js";
import MentorInfoSection from "./MentorInfoSection";
import { Json } from "@/integrations/supabase/types";

interface ProfileViewProps {
  user: User;
  onEdit: () => void;
}

interface ProfileData {
  bio?: string;
  title?: string;
  location?: string;
  avatar_url?: string;
  mentor_info?: {
    company?: string;
    position?: string;
    expertise_areas?: string[];
    experience?: string;
    hourly_rate?: string;
    education?: {
      school?: string;
      major?: string;
      graduation_year?: string;
    };
    internships?: Array<{
      id: string;
      company: string;
      role: string;
      start_date: string;
      end_date: string;
      description?: string;
    }>;
  };
}

export const ProfileView = ({ user, onEdit }: ProfileViewProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          // Convert the JSON data to our expected format
          const profileWithTypedMentorInfo: ProfileData = {
            ...data,
            mentor_info: data.mentor_info as ProfileData['mentor_info']
          };
          
          setProfileData(profileWithTypedMentorInfo);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  if (isLoading) {
    return <div className="text-center py-4">Loading profile...</div>;
  }

  const isMentor = !!profileData?.mentor_info;
  const hasInternships = profileData?.mentor_info?.internships && profileData.mentor_info.internships.length > 0;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <Button onClick={onEdit} variant="outline" size="sm">
          <Pen className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <ProfileHeader user={user} profileData={profileData || undefined} />

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">About</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          {profileData?.bio ? (
            <p className="text-gray-700">{profileData.bio}</p>
          ) : (
            <p className="text-gray-500 italic">No bio provided yet.</p>
          )}
        </div>
      </div>

      {isMentor && profileData?.mentor_info && (
        <>
          <MentorInfoSection mentorInfo={profileData.mentor_info} />
          
          {/* Highlight internship experience if present */}
          {hasInternships && (
            <div className="mt-4 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-blue-600">Your Internship Experience</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                You've added {profileData.mentor_info.internships.length} internship{profileData.mentor_info.internships.length > 1 ? 's' : ''} to your profile.
                These experiences are visible to potential mentees.
              </p>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default ProfileView;
