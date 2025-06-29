
import { User } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  user: SupabaseUser;
  profileData?: {
    title?: string;
    location?: string;
    avatar_url?: string;
    bio?: string;
  };
}

export const ProfileHeader = ({ user, profileData }: ProfileHeaderProps) => {
  // Get the user's full name with proper priority
  const fullName = user?.user_metadata?.full_name || 
                  user?.user_metadata?.name || 
                  "Anya Von Diessl"; // Fallback to the known name if metadata isn't available
  
  return (
    <div className="flex items-center mb-6">
      <Avatar className="h-16 w-16">
        <AvatarImage 
          src={profileData?.avatar_url || ''} 
          alt={fullName} 
        />
        <AvatarFallback className="bg-gray-100">
          <User className="h-8 w-8 text-gray-600" />
        </AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <h2 className="text-xl font-medium">
          {fullName}
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
