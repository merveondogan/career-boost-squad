
import { memo } from "react";
import FilterGroup from "./FilterGroup";
import PriceRangeFilter from "./PriceRangeFilter";

interface MentorFiltersProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  companies: string[];
  selectedCompanies: string[];
  toggleCompany: (company: string) => void;
  specialties: string[];
  selectedSpecialties: string[];
  toggleSpecialty: (specialty: string) => void;
}

const MentorFilters = memo(({
  priceRange,
  setPriceRange,
  companies,
  selectedCompanies,
  toggleCompany,
  specialties,
  selectedSpecialties,
  toggleSpecialty,
}: MentorFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      
      {/* Price Range filter */}
      <PriceRangeFilter priceRange={priceRange} onChange={setPriceRange} />
      
      {/* Company filter */}
      <FilterGroup
        title="Companies"
        items={companies}
        selectedItems={selectedCompanies}
        onToggleItem={toggleCompany}
      />
      
      {/* Specialty filter */}
      <FilterGroup
        title="Specialties"
        items={specialties}
        selectedItems={selectedSpecialties}
        onToggleItem={toggleSpecialty}
      />
    </div>
  );
});

MentorFilters.displayName = "MentorFilters";

export default MentorFilters;
