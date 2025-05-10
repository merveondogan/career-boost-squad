
import { memo } from "react";
import { MentorProps } from "../MentorCard";
import MentorCard from "../MentorCard";
import MentorListHeader from "./MentorListHeader";

interface MentorListProps {
  mentors: MentorProps[];
  isLoading: boolean;
}

const MentorList = memo(({ mentors, isLoading }: MentorListProps) => {
  if (isLoading) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p>Loading mentors...</p>
      </div>
    );
  }

  return (
    <>
      <MentorListHeader count={mentors.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-gray-500">
            <p>No mentors match your current filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
});

MentorList.displayName = "MentorList";

export default MentorList;
