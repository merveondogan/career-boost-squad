import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MentorProps } from "@/components/MentorCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import MentorHero from "@/components/mentor/MentorHero";
import MentorFilters from "@/components/mentor/MentorFilters";
import MentorList from "@/components/mentor/MentorList";

// Sample mentor data for fallback
const sampleMentors: MentorProps[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Software Engineer Intern",
    company: "Google",
    school: "Stanford University",
    rate: 60,
    specialties: ["Resume Review", "Mock Interview", "Technical Prep"],
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Product Manager",
    company: "Meta",
    school: "UC Berkeley",
    rate: 75,
    specialties: ["Product Case Studies", "PM Interview Prep", "Resume Review"],
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: "3",
    name: "Sophia Patel",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Business Analyst Intern",
    company: "BCG",
    school: "Harvard University",
    rate: 65,
    specialties: ["Case Interviews", "Resume Review", "Career Strategy"],
    rating: 5.0,
    reviewCount: 32
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Data Science Intern",
    company: "Amazon",
    school: "MIT",
    rate: 70,
    specialties: ["Data Analysis", "Technical Interview", "Resume Review"],
    rating: 4.7,
    reviewCount: 15
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    role: "UX Design Intern",
    company: "Apple",
    school: "Rhode Island School of Design",
    rate: 55,
    specialties: ["Portfolio Review", "Design Challenge", "Interview Prep"],
    rating: 4.9,
    reviewCount: 21
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    role: "Investment Banking Analyst",
    company: "Morgan Stanley",
    school: "University of Pennsylvania",
    rate: 80,
    specialties: ["Technical Questions", "Resume Review", "Interview Prep"],
    rating: 4.8,
    reviewCount: 14
  },
  {
    id: "7",
    name: "Taylor Swift",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    role: "Music Production Intern",
    company: "Republic Records",
    school: "Berklee College of Music",
    rate: 90,
    specialties: ["Music Business", "Songwriting", "Artist Development"],
    rating: 5.0,
    reviewCount: 89
  }
];

const MentorListing = () => {
  const [mentors, setMentors] = useState<MentorProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all profiles that have mentor_info (indicating they're mentors)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .not('mentor_info', 'is', null);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform Supabase profile data to MentorProps format
          const mentorsData = data.map(profile => {
            const mentorInfo = profile.mentor_info as any;
            return {
              id: profile.id,
              name: mentorInfo?.full_name || "Unnamed Mentor",
              avatar: profile.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
              role: mentorInfo?.position || profile.title || "Mentor",
              company: mentorInfo?.company || "Unknown",
              school: mentorInfo?.education?.school || "Unknown",
              rate: parseInt(mentorInfo?.hourly_rate || "50", 10),
              specialties: mentorInfo?.expertise_areas || ["General Mentoring"],
              rating: 5.0, // Default rating for now
              reviewCount: 0  // Default review count for now
            };
          });
          
          setMentors(mentorsData.length > 0 ? mentorsData : sampleMentors);
        } else {
          // Fallback to sample data if no mentors found
          setMentors(sampleMentors);
        }
      } catch (error: any) {
        console.error("Error fetching mentors:", error.message);
        toast({
          variant: "destructive",
          title: "Failed to load mentors",
          description: "Please try again later."
        });
        // Use sample data as fallback
        setMentors(sampleMentors);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMentors();
  }, [toast]);
  
  // Extract unique companies and specialties for filters
  const companies = Array.from(new Set(mentors.map(mentor => mentor.company)));
  const specialties = Array.from(new Set(mentors.flatMap(mentor => mentor.specialties)));
  
  // Toggle filter functions
  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  // Improved search function that searches more thoroughly
  const filteredMentors = mentors.filter(mentor => {
    // More comprehensive search that checks all relevant fields
    const searchFields = [
      mentor.name.toLowerCase(),
      mentor.company.toLowerCase(),
      mentor.role.toLowerCase(),
      mentor.school.toLowerCase(),
      ...mentor.specialties.map(s => s.toLowerCase())
    ];
    
    const matchesSearch = 
      searchTerm === "" || 
      searchFields.some(field => field.includes(searchTerm.toLowerCase()));
      
    const matchesPrice = 
      mentor.rate >= priceRange[0] && mentor.rate <= priceRange[1];
      
    const matchesCompany = 
      selectedCompanies.length === 0 || 
      selectedCompanies.includes(mentor.company);
      
    const matchesSpecialty = 
      selectedSpecialties.length === 0 || 
      mentor.specialties.some(specialty => selectedSpecialties.includes(specialty));
      
    return matchesSearch && matchesPrice && matchesCompany && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow">
        {/* Hero section with search */}
        <MentorHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <MentorFilters 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                companies={companies}
                selectedCompanies={selectedCompanies}
                toggleCompany={toggleCompany}
                specialties={specialties}
                selectedSpecialties={selectedSpecialties}
                toggleSpecialty={toggleSpecialty}
              />
            </div>
            
            {/* Mentor cards */}
            <div className="lg:col-span-3">
              <MentorList mentors={filteredMentors} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorListing;
