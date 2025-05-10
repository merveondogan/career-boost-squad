
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorCard, { MentorProps } from "@/components/MentorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Sample mentor data - expanded
const allMentors: MentorProps[] = [
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
  }
];

const MentorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  // Extract unique companies and specialties for filters
  const companies = Array.from(new Set(allMentors.map(mentor => mentor.company)));
  const specialties = Array.from(new Set(allMentors.flatMap(mentor => mentor.specialties)));
  
  // Filter mentors based on search and filters
  const filteredMentors = allMentors.filter(mentor => {
    const matchesSearch = 
      searchTerm === "" || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.school.toLowerCase().includes(searchTerm.toLowerCase());
      
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow"> {/* Add padding to account for fixed navbar */}
        {/* Hero section */}
        <div className="bg-brand-light py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900">Find Your Perfect Mentor</h1>
              <p className="mt-4 text-xl text-gray-600">
                Connect with recent graduates who've landed internships at top companies
              </p>
              
              {/* Search bar */}
              <div className="mt-8 max-w-xl mx-auto">
                <div className="flex w-full items-center space-x-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search by name, company, role..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                
                {/* Price Range filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}/hr</span>
                      <span>${priceRange[1]}/hr</span>
                    </div>
                  </div>
                </div>
                
                {/* Company filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Companies</h3>
                  <div className="space-y-2">
                    {companies.map(company => (
                      <div key={company} className="flex items-center">
                        <Checkbox
                          id={`company-${company}`}
                          checked={selectedCompanies.includes(company)}
                          onCheckedChange={() => toggleCompany(company)}
                        />
                        <Label
                          htmlFor={`company-${company}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {company}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Specialty filter */}
                <div>
                  <h3 className="font-semibold mb-2">Specialties</h3>
                  <div className="space-y-2">
                    {specialties.map(specialty => (
                      <div key={specialty} className="flex items-center">
                        <Checkbox
                          id={`specialty-${specialty}`}
                          checked={selectedSpecialties.includes(specialty)}
                          onCheckedChange={() => toggleSpecialty(specialty)}
                        />
                        <Label
                          htmlFor={`specialty-${specialty}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mentor cards */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-xl">Available Mentors</h2>
                  <p className="text-sm text-gray-600">{filteredMentors.length} mentors found</p>
                </div>
                {/* Optional: Add sorting controls here */}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMentors.length > 0 ? (
                  filteredMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center text-gray-500">
                    <p>No mentors match your current filters. Try adjusting your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorListing;
