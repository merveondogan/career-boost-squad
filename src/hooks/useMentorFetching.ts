
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
      setMentors(mentorsData);
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
    fetchMentorData();
  }, [fetchMentorData]);

  // Expose refetch function for manual refreshes
  const refetch = useCallback(() => {
    return fetchMentorData();
  }, [fetchMentorData]);

  return { mentors, isLoading, refetch };
};
