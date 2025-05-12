
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorHero from "@/components/mentor/MentorHero";
import MentorFilters from "@/components/mentor/MentorFilters";
import MentorList from "@/components/mentor/MentorList";
import { useMentorFetching } from "@/hooks/useMentorFetching";
import { useMentorFiltering } from "@/hooks/useMentorFiltering";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MentorListing = () => {
  const { mentors, isLoading, refetch } = useMentorFetching();
  const { toast } = useToast();
  
  // Add debug logging
  console.log("DEBUGGING MentorListing: Got", mentors.length, "mentors from hook");
  console.log("DEBUGGING MentorListing: Raw mentor data:", mentors);
  
  const {
    searchTerm,
    priceRange, 
    selectedCompanies,
    selectedSpecialties,
    companies,
    specialties,
    filteredMentors,
    setSearchTerm,
    setPriceRange,
    toggleCompany,
    toggleSpecialty
  } = useMentorFiltering(mentors);
  
  // Add more debug logging
  console.log("DEBUGGING MentorListing: After filtering, have", filteredMentors.length, "mentors");
  console.log("DEBUGGING MentorListing: Filtered mentor IDs:", filteredMentors.map(m => m.id));

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing mentor list",
      description: "Looking for the latest available mentors."
    });
  };

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
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  Refresh Mentors
                </Button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Want to become a mentor?</p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/profile">Enable in your profile</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mentor cards */}
            <div className="lg:col-span-3">
              <MentorList 
                mentors={filteredMentors} 
                isLoading={isLoading}
                onSort={(sortOption) => console.log("Sort by:", sortOption)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorListing;
