
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Internship } from "./types";
import { InternshipForm } from "./internship/InternshipForm";
import { InternshipList } from "./internship/InternshipList";

interface InternshipsFieldProps {
  internships: Internship[];
  onChange: (internships: Internship[]) => void;
}

export const InternshipsField = ({ 
  internships,
  onChange
}: InternshipsFieldProps) => {
  const [showForm, setShowForm] = useState(false);
  
  const handleAdd = (internshipData: Omit<Internship, "id">) => {
    const newInternship = {
      ...internshipData,
      id: Date.now().toString()
    };
    
    onChange([...internships, newInternship]);
    
    // Reset form
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    onChange(internships.filter(internship => internship.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Internship Experience</h3>
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)} 
            variant="outline" 
            size="sm"
            type="button"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Internship
          </Button>
        )}
      </div>
      
      <InternshipList 
        internships={internships}
        onDelete={handleDelete}
      />
      
      {showForm && (
        <InternshipForm 
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
