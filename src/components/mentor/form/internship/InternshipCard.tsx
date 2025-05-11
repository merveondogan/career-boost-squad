
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Internship } from "../types";
import { formatDate } from "./utils";

interface InternshipCardProps {
  internship: Internship;
  onDelete: (id: string) => void;
}

export const InternshipCard = ({ internship, onDelete }: InternshipCardProps) => {
  return (
    <Card className="relative">
      <Button
        onClick={() => onDelete(internship.id)}
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
  );
};
