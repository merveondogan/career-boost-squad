
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface MentorStatusToggleProps {
  isMentor: boolean;
  setIsMentor: (isMentor: boolean) => void;
  userId: string;
}

export const MentorStatusToggle = ({ 
  isMentor, 
  setIsMentor,
  userId
}: MentorStatusToggleProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleToggleMentorStatus = async () => {
    if (!userId) return;
    
    setIsProcessing(true);
    try {
      if (isMentor) {
        // Remove mentor status - update the profile instead of setting is_mentor flag
        const { error } = await supabase
          .from('profiles')
          .update({ 
            mentor_info: null  // Clear mentor info which is how we now determine mentor status
          })
          .eq('id', userId);
          
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
        // Check if user has mentor_info
        const { data, error } = await supabase
          .from('profiles')
          .select('mentor_info')
          .eq('id', userId)
          .single();
          
        if (error) throw error;
        
        if (data.mentor_info && Object.keys(data.mentor_info).length > 0) {
          // User already has mentor info, just update metadata
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              is_mentor: true,
              user_type: 'mentor'
            }
          });
            
          if (updateError) throw updateError;
          
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
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {isMentor ? (
        <Button 
          variant="outline" 
          onClick={handleToggleMentorStatus}
          disabled={isProcessing}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          {isProcessing ? "Processing..." : "Disable Mentor Status"}
        </Button>
      ) : (
        <Button 
          onClick={handleToggleMentorStatus}
          variant="outline" 
          disabled={isProcessing}
          className="text-green-600 border-green-200 hover:bg-green-50"
        >
          {isProcessing ? "Processing..." : "Become a Mentor"}
        </Button>
      )}
    </div>
  );
};

export default MentorStatusToggle;
