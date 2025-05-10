
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MentorFormProps } from "./types";

export const RateField = ({ 
  formData, 
  handleInputChange 
}: Pick<MentorFormProps, 'formData' | 'handleInputChange'>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <Input
          id="hourlyRate"
          name="hourlyRate"
          type="number"
          min="0"
          step="5"
          className="pl-7"
          placeholder="40"
          value={formData.hourlyRate}
          onChange={handleInputChange}
          required
        />
      </div>
      <p className="text-sm text-gray-500">Set your rate for 1-hour mentoring sessions</p>
    </div>
  );
};
