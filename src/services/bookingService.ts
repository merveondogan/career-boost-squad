
import { supabase } from "@/integrations/supabase/client";
import { format, parse, addMinutes } from "date-fns";

export interface AvailabilitySlot {
  id?: string;
  mentor_id: string;
  day_of_week: number;
  start_time: string; // In HH:MM format
  end_time: string; // In HH:MM format
}

export interface BookingSlot {
  id?: string;
  mentor_id: string;
  date: Date;
  startTime: string; // In HH:MM format
  endTime: string; // In HH:MM format
  isAvailable: boolean;
}

// Fetch mentor's availability
export const fetchMentorAvailability = async (mentorId: string) => {
  try {
    const { data, error } = await supabase
      .from("mentor_availability")
      .select("*")
      .eq("mentor_id", mentorId);

    if (error) throw error;
    return data as AvailabilitySlot[];
  } catch (error: any) {
    console.error("Error fetching mentor availability:", error.message);
    return [];
  }
};

// Add a new availability slot
export const addAvailabilitySlot = async (slot: AvailabilitySlot) => {
  try {
    const { data, error } = await supabase
      .from("mentor_availability")
      .insert([slot])
      .select();

    if (error) throw error;
    return data[0] as AvailabilitySlot;
  } catch (error: any) {
    console.error("Error adding availability slot:", error.message);
    throw error;
  }
};

// Delete an availability slot
export const deleteAvailabilitySlot = async (slotId: string) => {
  try {
    const { error } = await supabase
      .from("mentor_availability")
      .delete()
      .eq("id", slotId);

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("Error deleting availability slot:", error.message);
    throw error;
  }
};

// Book a session
export const bookSession = async (
  mentorId: string,
  studentId: string,
  title: string,
  description: string,
  startTime: Date,
  endTime: Date
) => {
  try {
    const { data, error } = await supabase
      .from("mentoring_sessions")
      .insert([
        {
          mentor_id: mentorId,
          student_id: studentId,
          title,
          description,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: "pending"
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error: any) {
    console.error("Error booking session:", error.message);
    throw error;
  }
};

// Generate available booking slots based on mentor's availability
export const generateAvailableSlots = (
  availability: AvailabilitySlot[],
  startDate: Date,
  daysToShow: number = 14,
  sessionDuration: number = 60 // in minutes
) => {
  const slots: BookingSlot[] = [];
  
  // Create slots for the next daysToShow days
  for (let dayOffset = 0; dayOffset < daysToShow; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayOffset);
    const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Find availability for this day of the week
    const dayAvailability = availability.filter(
      slot => slot.day_of_week === currentDayOfWeek
    );
    
    // For each availability period, create slots of sessionDuration length
    dayAvailability.forEach(avail => {
      const startTimeObj = parse(avail.start_time, "HH:mm:ss", new Date());
      const endTimeObj = parse(avail.end_time, "HH:mm:ss", new Date());
      
      let currentSlotStart = new Date(startTimeObj);
      
      // Create slots until we reach the end time
      while (addMinutes(currentSlotStart, sessionDuration) <= endTimeObj) {
        const slotEnd = addMinutes(currentSlotStart, sessionDuration);
        
        slots.push({
          mentor_id: avail.mentor_id,
          date: new Date(currentDate),
          startTime: format(currentSlotStart, "HH:mm"),
          endTime: format(slotEnd, "HH:mm"),
          isAvailable: true
        });
        
        currentSlotStart = slotEnd;
      }
    });
  }
  
  return slots;
};
