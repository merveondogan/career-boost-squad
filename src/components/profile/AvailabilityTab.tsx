
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { fetchMentorAvailability } from "@/services/bookingService";
import { useQuery } from "@tanstack/react-query";
import AddAvailabilityForm from "./availability/AddAvailabilityForm";
import AvailabilityList from "./availability/AvailabilityList";

const AvailabilityTab = () => {
  const { user } = useAuth();
  
  // Use react-query for better data fetching and caching
  const { data: availabilitySlots = [], isLoading } = useQuery({
    queryKey: ['mentorAvailability', user?.id],
    queryFn: () => user ? fetchMentorAvailability(user.id) : Promise.resolve([]),
    enabled: !!user,
  });
  
  if (isLoading) {
    return <div className="text-center py-6">Loading your availability...</div>;
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Your Availability</h2>
      <p className="text-sm text-gray-500 mb-6">
        Set your weekly availability schedule. Students will be able to book sessions during these times.
      </p>
      
      {user && <AddAvailabilityForm userId={user.id} />}
      
      <div>
        <h3 className="text-lg font-medium mb-4">Current Availability</h3>
        {user && <AvailabilityList availabilitySlots={availabilitySlots} userId={user.id} />}
      </div>
    </Card>
  );
};

export default AvailabilityTab;
