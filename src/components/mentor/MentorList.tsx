
import { memo } from "react";
import { MentorProps } from "../MentorCard";
import MentorListHeader from "./MentorListHeader";
import MentorGrid from "./MentorGrid";

interface MentorListProps {
  mentors: MentorProps[];
  isLoading: boolean;
  title?: string;
  emptyStateMessage?: string;
  gridColumns?: number;
  onSort?: (sortOption: string) => void;
}

/**
 * A container component that handles displaying a list of mentors
 * with a header showing count and optional sorting controls
 */
const MentorList = memo(({ 
  mentors, 
  isLoading, 
  title = "Available Mentors",
  emptyStateMessage = "No mentors found. Check back soon!",
  gridColumns = 2,
  onSort
}: MentorListProps) => {
  console.log("DEBUGGING MentorList: Rendering with", mentors.length, "mentors");
  console.log("DEBUGGING MentorList: Mentor IDs:", mentors.map(m => m.id));
  
  return (
    <div className="space-y-6">
      <MentorListHeader 
        count={mentors.length} 
        title={title}
        onSort={onSort} 
      />
      <MentorGrid 
        mentors={mentors} 
        isLoading={isLoading}
        columns={gridColumns}
        emptyStateMessage={emptyStateMessage}
      />
    </div>
  );
});

MentorList.displayName = "MentorList";

export default MentorList;
