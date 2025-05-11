
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProfileData } from "@/hooks/useProfileData";
import ProfileTabs from "@/components/profile/ProfileTabs";
import MentorStatusToggle from "@/components/profile/MentorStatusToggle";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  
  const { isMentor, setIsMentor, isLoadingProfile } = useProfileData(user);
  
  // Redirect if not logged in
  if (!isLoading && !user) {
    navigate("/login");
    return null;
  }

  if (isLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Profile</h1>
              {isMentor && (
                <span className="inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Mentor
                </span>
              )}
            </div>
            
            {/* Mentor toggle button */}
            {user && (
              <MentorStatusToggle 
                isMentor={isMentor} 
                setIsMentor={setIsMentor} 
                userId={user.id} 
              />
            )}
          </div>
          
          {user && (
            <ProfileTabs
              user={user}
              isMentor={isMentor}
              isEditMode={isEditMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsEditMode={setIsEditMode}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
