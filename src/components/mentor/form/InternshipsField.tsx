
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Internship } from "./types";
import { Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface InternshipsFieldProps {
  internships: Internship[];
  onChange: (internships: Internship[]) => void;
}

export const InternshipsField = ({ 
  internships,
  onChange
}: InternshipsFieldProps) => {
  const [showForm, setShowForm] = useState(false);
  const [currentInternship, setCurrentInternship] = useState<Internship>({
    id: '',
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAdd = () => {
    const newInternship = {
      ...currentInternship,
      id: Date.now().toString()
    };
    
    onChange([...internships, newInternship]);
    
    // Reset form
    setCurrentInternship({
      id: '',
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    onChange(internships.filter(internship => internship.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentInternship(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string): string => {
    try {
      if (!dateString) return '';
      return format(new Date(dateString), 'MMM yyyy');
    } catch (e) {
      return dateString;
    }
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
      
      {internships.length > 0 ? (
        <div className="space-y-3">
          {internships.map((internship) => (
            <Card key={internship.id} className="relative">
              <Button
                onClick={() => handleDelete(internship.id)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{internship.role}</h4>
                    <p className="text-sm text-gray-600">{internship.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                  </div>
                </div>
                
                {internship.description && (
                  <p className="mt-2 text-sm text-gray-600">{internship.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No internships added yet.</p>
      )}
      
      {showForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
          <h4 className="font-medium">Add New Internship</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="e.g., Google"
                value={currentInternship.company}
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
                value={currentInternship.role}
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
                value={currentInternship.startDate}
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
                value={currentInternship.endDate}
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
              value={currentInternship.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button 
              onClick={() => setShowForm(false)} 
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAdd}
              type="button"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
