
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BookingSlot } from "@/services/bookingService";
import { MentorProps } from "@/components/MentorCard";
import { fetchMentors } from "@/services/mentorService";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/booking/BookingCalendar";
import BookingForm from "@/components/booking/BookingForm";

const BookSession = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<MentorProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  
  useEffect(() => {
    if (!mentorId) {
      navigate("/mentors");
      return;
    }
    
    const loadMentor = async () => {
      try {
        setLoading(true);
        const mentors = await fetchMentors();
        const foundMentor = mentors.find(m => m.id === mentorId);
        
        if (foundMentor) {
          setMentor(foundMentor);
        } else {
          toast({
            variant: "destructive",
            title: "Mentor not found",
            description: "The mentor you're looking for doesn't exist."
          });
          navigate("/mentors");
        }
      } catch (error) {
        console.error("Error loading mentor:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMentor();
  }, [mentorId, navigate]);
  
  const handleSlotSelect = (slot: BookingSlot) => {
    setSelectedSlot(slot);
  };
  
  const handleCancelSelection = () => {
    setSelectedSlot(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Button 
            variant="link" 
            className="pl-0 mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to mentors
          </Button>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <p>Loading...</p>
            </div>
          ) : mentor ? (
            <>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/3">
                  <div className="bg-white shadow-sm rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                          src={mentor.avatar || "/placeholder.svg"} 
                          alt={mentor.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium">{mentor.name}</h2>
                        <p className="text-sm text-gray-500">{mentor.role} at {mentor.company}</p>
                      </div>
                    </div>
                    
                    <Separator className="mb-4" />
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">60 minute session</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">Schedule flexible</span>
                      </div>
                      <p className="font-semibold mt-2 flex items-center justify-center p-2 bg-gray-50 rounded">
                        ${mentor.rate}/hour
                      </p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Expertise</h3>
                      <div className="flex flex-wrap gap-1">
                        {mentor.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  {selectedSlot ? (
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <BookingForm 
                        mentor={{id: mentor.id, name: mentor.name}} 
                        selectedSlot={selectedSlot} 
                        onCancel={handleCancelSelection} 
                      />
                    </div>
                  ) : (
                    <BookingCalendar mentorId={mentor.id} onSlotSelect={handleSlotSelect} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Mentor not found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookSession;
