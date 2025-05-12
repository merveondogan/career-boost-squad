
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AvailabilitySlot, deleteAvailabilitySlot } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dayOptions } from "./dayOptions";

interface AvailabilityListProps {
  availabilitySlots: AvailabilitySlot[];
  userId: string;
}

const AvailabilityList = ({ availabilitySlots, userId }: AvailabilityListProps) => {
  const queryClient = useQueryClient();
  
  // Mutation for deleting slots
  const deleteSlotMutation = useMutation({
    mutationFn: deleteAvailabilitySlot,
    onSuccess: () => {
      toast({
        title: "Availability deleted",
        description: "The availability slot has been removed."
      });
      
      // Refresh the availability data
      queryClient.invalidateQueries({ queryKey: ['mentorAvailability', userId] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error deleting availability",
        description: error.message
      });
    }
  });
  
  const handleDeleteSlot = async (id: string) => {
    deleteSlotMutation.mutate(id);
  };
  
  if (availabilitySlots.length === 0) {
    return <p className="text-gray-500 italic">No availability slots set yet.</p>;
  }
  
  return (
    <div className="space-y-2">
      {availabilitySlots.map((slot) => (
        <div key={slot.id} className="flex items-center justify-between p-3 border rounded-md">
          <div>
            <span className="font-medium">{dayOptions.find(day => day.value === slot.day_of_week.toString())?.label}: </span>
            <span>{slot.start_time} - {slot.end_time}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => slot.id && handleDeleteSlot(slot.id)}
            disabled={deleteSlotMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityList;
