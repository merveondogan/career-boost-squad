
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface MentorSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const MentorSearchBar = memo(({ searchTerm, setSearchTerm }: MentorSearchBarProps) => {
  return (
    <div className="mt-8 max-w-xl mx-auto">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name, company, role..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </div>
    </div>
  );
});

MentorSearchBar.displayName = "MentorSearchBar";

export default MentorSearchBar;
