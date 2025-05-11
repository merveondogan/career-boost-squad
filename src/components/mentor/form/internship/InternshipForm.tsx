
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Internship } from "../types";

interface InternshipFormProps {
  onAdd: (internship: Omit<Internship, "id">) => void;
  onCancel: () => void;
}

export const InternshipForm = ({ onAdd, onCancel }: InternshipFormProps) => {
  const [internship, setInternship] = useState<Omit<Internship, "id">>({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInternship(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onAdd(internship);
    // Reset form handled by parent after add
  };

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
      <h4 className="font-medium">Add New Internship</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            placeholder="e.g., Google"
            value={internship.company}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Role/Position</Label>
          <Input
            id="role"
            name="role"
            placeholder="e.g., Software Engineer Intern"
            value={internship.role}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="month"
            value={internship.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="month"
            value={internship.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your responsibilities and achievements..."
          value={internship.description}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button 
          onClick={onCancel}
          variant="outline"
          type="button"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          type="button"
        >
          Add
        </Button>
      </div>
    </div>
  );
};
