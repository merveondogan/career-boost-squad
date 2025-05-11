
import { memo } from "react";
import { SearchX } from "lucide-react";

interface MentorEmptyStateProps {
  message?: string;
}

const MentorEmptyState = memo(({ message = "No mentors are currently available. Users can enable the mentor feature in their profile settings to appear in this list." }: MentorEmptyStateProps) => {
  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-gray-500">
      <SearchX className="h-12 w-12 mb-2 text-gray-400" />
      <p className="mb-2">{message}</p>
      <p className="text-sm text-gray-400">
        Anyone can become a mentor by completing their profile and enabling the mentor option.
      </p>
    </div>
  );
});

MentorEmptyState.displayName = "MentorEmptyState";

export default MentorEmptyState;
