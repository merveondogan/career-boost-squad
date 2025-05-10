
import { User } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileHeaderProps {
  user: SupabaseUser;
  profileData?: {
    title?: string;
    location?: string;
  };
}

export const ProfileHeader = ({ user, profileData }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <div className="bg-gray-100 p-4 rounded-full">
        <User className="h-12 w-12 text-gray-600" />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-medium">
          {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
        </h2>
        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
        {profileData?.title && (
          <p className="text-sm text-gray-600 mt-1">
            {profileData.title}
          </p>
        )}
        {profileData?.location && (
          <p className="text-sm text-gray-600">
            {profileData.location}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
