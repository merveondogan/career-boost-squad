
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { fetchMentorAvailability, addAvailabilitySlot, deleteAvailabilitySlot, AvailabilitySlot } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";

const dayOptions = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
];

const AvailabilityTab = () => {
  const { user } = useAuth();
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({
    day_of_week: 1, // Monday by default
    start_time: "09:00",
    end_time: "17:00"
  });
  const [isAdding, setIsAdding] = useState(false);
  
  useEffect(() => {
    if (user) {
      loadAvailability();
    }
  }, [user]);
  
  const loadAvailability = async () => {
    try {
      setLoading(true);
      if (user) {
        const slots = await fetchMentorAvailability(user.id);
        setAvailabilitySlots(slots);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading availability",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddSlot = async () => {
    try {
      if (!user) return;
      
      setIsAdding(true);
      
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
        mentor_id: user.id,
        day_of_week: Number(newSlot.day_of_week),
        start_time: `${start}:00`,
        end_time: `${end}:00`
      };
      
      await addAvailabilitySlot(slot);
      toast({
        title: "Availability added",
        description: "Your new availability slot has been added."
      });
      
      // Reset form and refresh list
      setNewSlot({
        day_of_week: 1,
        start_time: "09:00",
        end_time: "17:00"
      });
      loadAvailability();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding availability",
        description: error.message
      });
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleDeleteSlot = async (id: string) => {
    try {
      await deleteAvailabilitySlot(id);
      toast({
        title: "Availability deleted",
        description: "The availability slot has been removed."
      });
      loadAvailability();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting availability",
        description: error.message
      });
    }
  };
  
  if (loading) {
    return <div className="text-center py-6">Loading your availability...</div>;
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Your Availability</h2>
      <p className="text-sm text-gray-500 mb-6">
        Set your weekly availability schedule. Students will be able to book sessions during these times.
      </p>
      
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
          <Button onClick={handleAddSlot} disabled={isAdding}>
            <Plus className="h-4 w-4 mr-2" />
            Add Availability
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Current Availability</h3>
        {availabilitySlots.length === 0 ? (
          <p className="text-gray-500 italic">No availability slots set yet.</p>
        ) : (
          <div className="space-y-2">
            {availabilitySlots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <span className="font-medium">{dayOptions.find(day => day.value === slot.day_of_week.toString())?.label}: </span>
                  <span>{slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => slot.id && handleDeleteSlot(slot.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AvailabilityTab;
