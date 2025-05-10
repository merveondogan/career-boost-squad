
import { memo } from "react";
import MentorSearchBar from "./MentorSearchBar";

interface MentorHeroProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const MentorHero = memo(({ searchTerm, setSearchTerm }: MentorHeroProps) => {
  return (
    <div className="bg-brand-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Find Your Perfect Mentor</h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect with recent graduates who've landed internships at top companies
          </p>
          
          {/* Search bar */}
          <MentorSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </div>
  );
});

MentorHero.displayName = "MentorHero";

export default MentorHero;
