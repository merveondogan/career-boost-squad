
import { memo } from "react";
import { SearchX } from "lucide-react";

interface MentorEmptyStateProps {
  message?: string;
}

const MentorEmptyState = memo(({ message = "No mentors match your current filters. Try adjusting your search criteria or check back soon as mentors are joining our platform!" }: MentorEmptyStateProps) => {
  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-gray-500">
      <SearchX className="h-12 w-12 mb-2 text-gray-400" />
      <p className="mb-2">{message}</p>
      <p className="text-sm text-gray-400">
        Note: New mentors may take some time to appear in this list after completing their application.
      </p>
    </div>
  );
});

MentorEmptyState.displayName = "MentorEmptyState";

export default MentorEmptyState;
