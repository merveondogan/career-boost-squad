
import { memo } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MentorListHeaderProps {
  count: number;
  title?: string;
  onSort?: (sortOption: string) => void;
}

const MentorListHeader = memo(({ 
  count, 
  title = "Available Mentors", 
  onSort 
}: MentorListHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-sm text-gray-600">{count} mentors found</p>
      </div>
      
      {onSort && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort by <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSort("rating")}>
              Highest Rated
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("price_low")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("price_high")}>
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("reviews")}>
              Most Reviews
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
});

MentorListHeader.displayName = "MentorListHeader";

export default MentorListHeader;
