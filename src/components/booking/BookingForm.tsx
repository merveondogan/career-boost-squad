
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { format, parseISO, parse } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookingSlot, bookSession } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";

interface BookingFormProps {
  mentor: {
    id: string;
    name: string;
  };
  selectedSlot: BookingSlot;
  onCancel: () => void;
}

const BookingForm = ({ mentor, selectedSlot, onCancel }: BookingFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatDate = (date: Date) => {
    return format(date, "MMMM d, yyyy");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to be logged in to book a session."
      });
      navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }
    
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a title for your session."
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create start and end time Date objects
      const bookingDate = new Date(selectedSlot.date);
      const [startHours, startMinutes] = selectedSlot.startTime.split(':').map(Number);
      const [endHours, endMinutes] = selectedSlot.endTime.split(':').map(Number);
      
      const startDateTime = new Date(bookingDate);
      startDateTime.setHours(startHours, startMinutes, 0);
      
      const endDateTime = new Date(bookingDate);
      endDateTime.setHours(endHours, endMinutes, 0);
      
      // Book the session
      await bookSession(
        mentor.id,
        user.id,
        title,
        description,
        startDateTime,
        endDateTime
      );
      
      toast({
        title: "Session booked!",
        description: "Your mentoring session has been successfully booked."
      });
      
      navigate("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: error.message || "There was an error booking your session."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Confirm Your Booking</h3>
        <p className="text-sm text-gray-500">
          You're booking a session with {mentor.name}
        </p>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Date:</span>
          <span className="text-sm font-medium">{formatDate(new Date(selectedSlot.date))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Time:</span>
          <span className="text-sm font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Session Title</Label>
        <Input
          id="title"
          placeholder="e.g., Career Advice Session"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">What would you like to discuss?</Label>
        <Textarea
          id="description"
          placeholder="Briefly describe what you'd like to cover in this mentoring session..."
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
