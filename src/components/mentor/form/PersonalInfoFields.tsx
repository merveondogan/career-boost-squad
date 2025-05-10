
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MentorFormProps } from "./types";

export const PersonalInfoFields = ({ 
  formData, 
  handleInputChange 
}: Pick<MentorFormProps, 'formData' | 'handleInputChange'>) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">Current/Previous Company</Label>
          <Input
            id="company"
            name="company"
            placeholder="Google, Meta, etc."
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="position">Position/Role</Label>
          <Input
            id="position"
            name="position"
            placeholder="Software Engineer Intern, Data Scientist, etc."
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio / Introduction</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell students about yourself and how you can help them..."
          value={formData.bio}
          onChange={handleInputChange}
          className="h-32"
          required
        />
      </div>
    </>
  );
};
