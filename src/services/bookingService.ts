
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
    
    return data as unknown as AvailabilitySlot[];
  } catch (error: any) {
    console.error("Error fetching mentor availability:", error.message);
    return [];
  }
};

// Add a new availability slot
export const addAvailabilitySlot = async (slot: AvailabilitySlot) => {
  try {
    // Create a properly formatted object for insertion
    const availabilityData = {
      mentor_id: slot.mentor_id,
      day_of_week: slot.day_of_week,
      start_time: slot.start_time,
      end_time: slot.end_time
    };
    
    const { data, error } = await supabase
      .from("mentor_availability")
      .insert([availabilityData])
      .select();

    if (error) throw error;
    
    return data[0] as unknown as AvailabilitySlot;
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
      const startTimeObj = parse(avail.start_time, "HH:mm", new Date());
      const endTimeObj = parse(avail.end_time, "HH:mm", new Date());
      
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

// Update an existing availability slot
export const updateAvailabilitySlot = async (slotId: string, updatedSlot: Partial<AvailabilitySlot>) => {
  try {
    const { data, error } = await supabase
      .from("mentor_availability")
      .update(updatedSlot)
      .eq("id", slotId)
      .select();

    if (error) throw error;
    return data[0] as unknown as AvailabilitySlot;
  } catch (error: any) {
    console.error("Error updating availability slot:", error.message);
    throw error;
  }
};

// Delete session by ID - direct method to remove specific sessions
export const deleteSession = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from("mentoring_sessions")
      .delete()
      .eq("id", sessionId);

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("Error deleting session:", error.message);
    throw error;
  }
};

// Delete sessions by specific date and time - use exact date string matching instead of ILIKE
export const deleteMay19Sessions = async () => {
  try {
    // First get all the sessions on May 19, 2025 that are cancelled
    const { data, error } = await supabase
      .from("mentoring_sessions")
      .select("*")
      .eq("status", "cancelled")
      .filter("start_time", "ilike", "2025-05-19%")
      .filter("start_time", "ilike", "%09:00%");

    if (error) throw error;
    
    if (data && data.length > 0) {
      // Delete each found session
      for (const session of data) {
        const { error: deleteError } = await supabase
          .from("mentoring_sessions")
          .delete()
          .eq("id", session.id);
          
        if (deleteError) throw deleteError;
      }
      return data.length; // Return number of deleted sessions
    }
    return 0;
  } catch (error: any) {
    console.error("Error deleting May 19 sessions:", error);
    throw error;
  }
};

