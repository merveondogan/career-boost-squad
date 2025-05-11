
import { Internship } from "../types";
import { InternshipCard } from "./InternshipCard";

interface InternshipListProps {
  internships: Internship[];
  onDelete: (id: string) => void;
}

export const InternshipList = ({ internships, onDelete }: InternshipListProps) => {
  if (internships.length === 0) {
    return <p className="text-sm text-gray-500 italic">No internships added yet.</p>;
  }
  
  return (
    <div className="space-y-3">
      {internships.map((internship) => (
        <InternshipCard 
          key={internship.id} 
          internship={internship} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};
