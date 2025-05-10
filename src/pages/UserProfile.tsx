
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileView from "@/components/profile/ProfileView";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const handleEditSuccess = () => {
    setIsEditMode(false);
  };

  if (isLoading) {
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

  const isMentor = user?.user_metadata?.is_mentor || user?.user_metadata?.user_type === "mentor";

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
          </div>
          
          <div className="bg-white shadow rounded-lg">
            {isEditMode ? (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
                {user && <ProfileForm user={user} onSuccess={handleEditSuccess} />}
              </div>
            ) : (
              user && <ProfileView user={user} onEdit={() => setIsEditMode(true)} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
