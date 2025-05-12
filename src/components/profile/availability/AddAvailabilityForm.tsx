
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { AvailabilitySlot, addAvailabilitySlot } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dayOptions } from "./dayOptions";

interface AddAvailabilityFormProps {
  userId: string;
}

const AddAvailabilityForm = ({ userId }: AddAvailabilityFormProps) => {
  const queryClient = useQueryClient();
  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({
    day_of_week: 1, // Monday by default
    start_time: "09:00",
    end_time: "17:00"
  });
  
  // Mutation for adding slots
  const addSlotMutation = useMutation({
    mutationFn: addAvailabilitySlot,
    onSuccess: () => {
      toast({
        title: "Availability added",
        description: "Your new availability slot has been added."
      });
      
      // Reset form
      setNewSlot({
        day_of_week: 1,
        start_time: "09:00",
        end_time: "17:00"
      });
      
      // Refresh the availability data
      queryClient.invalidateQueries({ queryKey: ['mentorAvailability', userId] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error adding availability",
        description: error.message
      });
    }
  });
  
  const handleAddSlot = async () => {
    // Validate times
    const start = newSlot.start_time;
    const end = newSlot.end_time;
    
    if (!start || !end) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select both start and end times."
      });
      return;
    }
    
    if (start >= end) {
      toast({
        variant: "destructive",
        title: "Invalid time range",
        description: "End time must be after start time."
      });
      return;
    }
    
    const slot: AvailabilitySlot = {
      mentor_id: userId,
      day_of_week: Number(newSlot.day_of_week),
      start_time: start,
      end_time: end
    };
    
    addSlotMutation.mutate(slot);
  };
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Add New Availability</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="day">Day of Week</Label>
          <Select 
            value={newSlot.day_of_week?.toString()} 
            onValueChange={(value) => setNewSlot({...newSlot, day_of_week: Number(value)})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {dayOptions.map(day => (
                <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input 
            type="time" 
            id="startTime" 
            value={newSlot.start_time} 
            onChange={(e) => setNewSlot({...newSlot, start_time: e.target.value})}
          />
        </div>
        
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input 
            type="time" 
            id="endTime" 
            value={newSlot.end_time} 
            onChange={(e) => setNewSlot({...newSlot, end_time: e.target.value})}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Button onClick={handleAddSlot} disabled={addSlotMutation.isPending}>
          <Plus className="h-4 w-4 mr-2" />
          Add Availability
        </Button>
      </div>
    </div>
  );
};

export default AddAvailabilityForm;
