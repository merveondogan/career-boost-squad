
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileView from "@/components/profile/ProfileView";
import ProfileForm from "@/components/profile/ProfileForm";
import SessionsTab from "@/components/profile/SessionsTab";
import AvailabilityTab from "@/components/profile/AvailabilityTab";
import { User } from "@supabase/supabase-js";

interface ProfileTabsProps {
  user: User;
  isMentor: boolean;
  isEditMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsEditMode: (isEditMode: boolean) => void;
}

export const ProfileTabs = ({
  user,
  isMentor,
  isEditMode,
  activeTab,
  setActiveTab,
  setIsEditMode,
}: ProfileTabsProps) => {
  const handleEditSuccess = () => {
    setIsEditMode(false);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="sessions">
          {isMentor ? "Mentoring Sessions" : "My Bookings"}
        </TabsTrigger>
        {isMentor && (
          <TabsTrigger value="availability">Availability</TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="profile" className="bg-white shadow rounded-lg">
        {isEditMode ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
            {user && <ProfileForm user={user} onSuccess={handleEditSuccess} />}
          </div>
        ) : (
          user && <ProfileView user={user} onEdit={() => setIsEditMode(true)} />
        )}
      </TabsContent>
      
      <TabsContent value="sessions" className="bg-white shadow rounded-lg p-6">
        <SessionsTab />
      </TabsContent>
      
      {isMentor && (
        <TabsContent value="availability" className="bg-white shadow rounded-lg">
          <AvailabilityTab />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProfileTabs;
