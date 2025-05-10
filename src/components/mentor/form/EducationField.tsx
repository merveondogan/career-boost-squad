
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Education } from "./types";

interface EducationFieldProps {
  education: Education;
  onChange: (education: Education) => void;
}

export const EducationField = ({ 
  education,
  onChange
}: EducationFieldProps) => {
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
          <Label htmlFor="school">School/University</Label>
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
          <Label htmlFor="graduationYear">Graduation Year</Label>
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
