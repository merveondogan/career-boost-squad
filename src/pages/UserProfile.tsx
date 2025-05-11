
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileView from "@/components/profile/ProfileView";
import SessionsTab from "@/components/profile/SessionsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isMentor, setIsMentor] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Fetch additional profile data including mentor status
  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
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
          
          // Check if user is a mentor based on is_mentor flag or user metadata
          const profileIsMentor = data?.is_mentor === true || 
                                 user?.user_metadata?.is_mentor === true ||
                                 user?.user_metadata?.user_type === "mentor";
          
          setIsMentor(profileIsMentor);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      
      fetchProfileData();
    }
  }, [user]);

  const handleEditSuccess = () => {
    setIsEditMode(false);
  };
  
  const handleBecomeMentor = () => {
    navigate("/become-mentor");
  };
  
  const handleToggleMentorStatus = async () => {
    if (!user) return;
    
    try {
      if (isMentor) {
        // Remove mentor status
        const { error } = await supabase
          .from('profiles')
          .update({ is_mentor: false })
          .eq('id', user.id);
          
        if (error) throw error;
        
        // Update user metadata
        await supabase.auth.updateUser({
          data: {
            is_mentor: false,
            user_type: 'user'
          }
        });
        
        toast({
          title: "Mentor status disabled",
          description: "You will no longer appear in the mentors list."
        });
        
        setIsMentor(false);
      } else {
        // If user has mentor_info, simply update the status
        const { data, error } = await supabase
          .from('profiles')
          .select('mentor_info')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data.mentor_info && Object.keys(data.mentor_info).length > 0) {
          // User already has mentor info, just update status
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_mentor: true })
            .eq('id', user.id);
            
          if (updateError) throw updateError;
          
          // Update user metadata
          await supabase.auth.updateUser({
            data: {
              is_mentor: true,
              user_type: 'mentor'
            }
          });
          
          toast({
            title: "Mentor status enabled",
            description: "You are now visible in the mentors list."
          });
          
          setIsMentor(true);
        } else {
          // User needs to complete mentor profile first
          navigate("/become-mentor");
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating mentor status",
        description: error.message || "Something went wrong. Please try again."
      });
    }
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
            <div>
              {isMentor ? (
                <Button 
                  variant="outline" 
                  onClick={handleToggleMentorStatus}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Disable Mentor Status
                </Button>
              ) : (
                <Button 
                  onClick={handleToggleMentorStatus}
                  variant="outline" 
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  Become a Mentor
                </Button>
              )}
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="sessions">
                {isMentor ? "Mentoring Sessions" : "My Bookings"}
              </TabsTrigger>
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
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
