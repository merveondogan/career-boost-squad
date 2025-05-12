
import { useState, useEffect } from "react";
import { format, addDays, startOfDay, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BookingSlot, fetchMentorAvailability, generateAvailableSlots } from "@/services/bookingService";

interface BookingCalendarProps {
  mentorId: string;
  onSlotSelect: (slot: BookingSlot) => void;
}

const BookingCalendar = ({ mentorId, onSlotSelect }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [daySlots, setDaySlots] = useState<BookingSlot[]>([]);

  // Fetch mentor availability and generate booking slots
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!mentorId) return;
      
      try {
        setLoading(true);
        const availability = await fetchMentorAvailability(mentorId);
        
        // Generate slots for the next 30 days based on the mentor's availability
        const today = startOfDay(new Date());
        const slots = generateAvailableSlots(availability, today, 30);
        
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [mentorId]);

  // Filter slots for the selected day
  useEffect(() => {
    if (date) {
      const slotsForSelectedDay = availableSlots.filter(slot => 
        isSameDay(new Date(slot.date), date)
      );
      setDaySlots(slotsForSelectedDay);
    } else {
      setDaySlots([]);
    }
  }, [date, availableSlots]);

  // Generate an array of dates that have available slots for highlighting in the calendar
  const datesWithSlots = availableSlots
    .map(slot => startOfDay(new Date(slot.date)))
    .filter((date, index, self) => 
      self.findIndex(d => isSameDay(d, date)) === index
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Date & Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
              modifiers={{
                available: datesWithSlots
              }}
              modifiersStyles={{
                available: { backgroundColor: "rgba(52, 211, 153, 0.1)" }
              }}
              className="rounded-md border p-3 pointer-events-auto"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">
              {date ? format(date, "EEEE, MMMM d") : "Select a date"}
            </h3>
            
            {loading ? (
              <div className="flex justify-center p-4">
                <p>Loading available times...</p>
              </div>
            ) : daySlots.length > 0 ? (
              <ScrollArea className="h-[220px]">
                <div className="space-y-2 pr-3">
                  {daySlots.map((slot, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => onSlotSelect(slot)}
                    >
                      {slot.startTime} - {slot.endTime}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <p className="text-sm text-gray-500">
                  {date ? "No available slots for this day." : "Please select a date."}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start border-t pt-4">
        <p className="text-xs text-gray-500">
          Available dates are highlighted in the calendar. Times shown are in your local timezone.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingCalendar;
