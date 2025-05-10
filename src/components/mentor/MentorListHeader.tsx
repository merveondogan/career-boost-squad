
import { memo } from "react";

interface MentorListHeaderProps {
  count: number;
}

const MentorListHeader = memo(({ count }: MentorListHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-xl">Available Mentors</h2>
        <p className="text-sm text-gray-600">{count} mentors found</p>
      </div>
      {/* Optional: Add sorting controls here */}
    </div>
  );
});

MentorListHeader.displayName = "MentorListHeader";

export default MentorListHeader;
