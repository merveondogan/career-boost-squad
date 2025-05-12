
import { useState, useEffect, useCallback } from 'react';
import { MentorProps } from "@/components/MentorCard";
import { fetchMentors } from "@/services/mentorService";
import { useToast } from "@/components/ui/use-toast";

export const useMentorFetching = () => {
  const [mentors, setMentors] = useState<MentorProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMentorData = useCallback(async () => {
    try {
      setIsLoading(true);
      const mentorsData = await fetchMentors();
      console.log("CRITICAL DEBUG - Hook received mentor profiles:", mentorsData.length);
      console.log("CRITICAL DEBUG - Hook received mentor IDs:", mentorsData.map(m => m.id));
      
      // IMPORTANT: Setting ALL mentors without any filtering
      // This ensures we show everyone's profile, not just our own
      setMentors(mentorsData);
      
      // Double check we haven't lost any mentors
      console.log("CRITICAL DEBUG - After state update, mentors length:", mentorsData.length);
    } catch (error: any) {
      console.error("Error fetching mentors:", error.message);
      toast({
        variant: "destructive",
        title: "Failed to load mentors",
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Initial fetch
  useEffect(() => {
    console.log("CRITICAL DEBUG - Initiating mentor fetch");
    fetchMentorData();
  }, [fetchMentorData]);

  // Expose refetch function for manual refreshes
  const refetch = useCallback(() => {
    console.log("CRITICAL DEBUG - Manually refreshing mentors");
    toast({
      title: "Refreshing mentors",
      description: "Looking for the latest mentors."
    });
    return fetchMentorData();
  }, [fetchMentorData, toast]);

  return { mentors, isLoading, refetch };
};
