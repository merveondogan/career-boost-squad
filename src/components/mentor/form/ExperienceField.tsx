
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MentorFormProps } from "./types";

export const ExperienceField = ({ 
  formData, 
  handleSelectChange 
}: Pick<MentorFormProps, 'formData' | 'handleSelectChange'>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="experience">Experience Level</Label>
      <Select 
        name="experience" 
        value={formData.experience}
        onValueChange={(value) => handleSelectChange("experience", value)}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select your experience level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-1">0-1 years</SelectItem>
          <SelectItem value="1-3">1-3 years</SelectItem>
          <SelectItem value="3-5">3-5 years</SelectItem>
          <SelectItem value="5+">5+ years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
