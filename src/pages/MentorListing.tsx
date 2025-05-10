
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorHero from "@/components/mentor/MentorHero";
import MentorFilters from "@/components/mentor/MentorFilters";
import MentorList from "@/components/mentor/MentorList";
import { useMentorFetching } from "@/hooks/useMentorFetching";
import { useMentorFiltering } from "@/hooks/useMentorFiltering";

const MentorListing = () => {
  const { mentors, isLoading } = useMentorFetching();
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
