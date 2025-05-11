
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Education } from "../types";
import { School, GraduationCap } from "lucide-react";

interface EducationFormProps {
  education: Education;
  onChange: (education: Education) => void;
}

export const EducationForm = ({ 
  education,
  onChange
}: EducationFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...education,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Education Information</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="school" className="flex items-center gap-1.5">
            <School className="h-4 w-4" />
            School/University
          </Label>
          <Input
            id="school"
            name="school"
            placeholder="e.g., Stanford University"
            value={education.school}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="major">Major/Field of Study</Label>
          <Input
            id="major"
            name="major"
            placeholder="e.g., Computer Science"
            value={education.major}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="graduationYear" className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" />
            Graduation Year
          </Label>
          <Input
            id="graduationYear"
            name="graduationYear"
            placeholder="e.g., 2023"
            value={education.graduationYear}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};
