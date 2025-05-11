import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export interface ExpertiseSelectorProps {
  selected: string[];
  onChange: (value: string[]) => void;
}

export const ExpertiseSelector = ({ selected, onChange }: ExpertiseSelectorProps) => {
  const [availableAreas, setAvailableAreas] = useState([
    "Frontend Development",
    "Backend Development",
    "Fullstack Development",
    "Mobile App Development (iOS)",
    "Mobile App Development (Android)",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "UI/UX Design",
    "Product Management",
    "Project Management",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Database Administration",
    "Network Engineering",
    "Sales",
    "Marketing",
    "Finance",
    "Human Resources",
  ]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(selected || []);

  useEffect(() => {
    setSelectedAreas(selected || []);
  }, [selected]);

  const handleSelect = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  useEffect(() => {
    onChange(selectedAreas);
  }, [selectedAreas, onChange]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Areas of Expertise</h3>
      <div className="flex flex-wrap gap-2">
        {availableAreas.map((area) => (
          <Badge
            key={area}
            variant={selectedAreas.includes(area) ? "secondary" : "outline"}
            onClick={() => handleSelect(area)}
            className="cursor-pointer"
          >
            {area}
            {selectedAreas.includes(area) && <Check className="ml-1 h-4 w-4" />}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseSelector;
