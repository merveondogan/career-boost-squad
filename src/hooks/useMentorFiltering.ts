
import { useState, useCallback, useMemo } from 'react';
import { MentorProps } from "@/components/MentorCard";

export const useMentorFiltering = (mentors: MentorProps[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  // Extract unique companies and specialties for filters
  const companies = useMemo(() => 
    Array.from(new Set(mentors.map(mentor => mentor.company))), 
    [mentors]
  );
  
  const specialties = useMemo(() => 
    Array.from(new Set(mentors.flatMap(mentor => mentor.specialties))), 
    [mentors]
  );
  
  // Use useCallback for handler functions to prevent unnecessary re-renders
  const setSearchTermCallback = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const setPriceRangeCallback = useCallback((value: number[]) => {
    setPriceRange(value);
  }, []);

  const toggleCompany = useCallback((company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  }, []);

  const toggleSpecialty = useCallback((specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  }, []);

  // Improved search function that searches more thoroughly
  const filteredMentors = useMemo(() => mentors.filter(mentor => {
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
  }), [mentors, searchTerm, priceRange, selectedCompanies, selectedSpecialties]);

  return {
    searchTerm,
    priceRange,
    selectedCompanies,
    selectedSpecialties,
    companies,
    specialties,
    filteredMentors,
    setSearchTerm: setSearchTermCallback,
    setPriceRange: setPriceRangeCallback,
    toggleCompany,
    toggleSpecialty
  };
};
