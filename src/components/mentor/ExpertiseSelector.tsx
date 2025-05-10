
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Available expertise areas
const expertiseOptions = [
  { id: "resume-review", label: "Resume Review" },
  { id: "interview-prep", label: "Interview Preparation" },
  { id: "career-advice", label: "Career Advice" },
  { id: "technical-skills", label: "Technical Skills" },
  { id: "application-strategy", label: "Application Strategy" },
  { id: "portfolio-review", label: "Portfolio Review" },
  { id: "networking", label: "Networking" },
  { id: "salary-negotiation", label: "Salary Negotiation" },
];

type ExpertiseSelectorProps = {
  selectedAreas: string[];
  onChange: (selectedAreas: string[]) => void;
};

export function ExpertiseSelector({ selectedAreas, onChange }: ExpertiseSelectorProps) {
  const handleExpertiseChange = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedAreas, id]);
    } else {
      onChange(selectedAreas.filter(area => area !== id));
    }
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="expertiseAreas">Areas of Expertise</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        {expertiseOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox 
              id={option.id} 
              checked={selectedAreas.includes(option.id)}
              onCheckedChange={(checked) => 
                handleExpertiseChange(option.id, checked as boolean)
              }
            />
            <Label 
              htmlFor={option.id} 
              className="cursor-pointer text-base font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">Select all areas where you can provide mentorship</p>
    </div>
  );
}
