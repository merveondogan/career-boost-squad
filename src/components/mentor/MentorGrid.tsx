
import { memo } from "react";
import { MentorProps } from "../MentorCard";
import MentorCardWrapper from "./MentorCardWrapper";
import MentorCardSkeleton from "./MentorCardSkeleton";
import MentorEmptyState from "./MentorEmptyState";

interface MentorGridProps {
  mentors: MentorProps[];
  isLoading?: boolean;
  columns?: number;
  emptyStateMessage?: string;
  loadingCount?: number;
}

/**
 * A reusable grid component for displaying mentor cards
 */
const MentorGrid = memo(({
  mentors,
  isLoading = false,
  columns = 2,
  emptyStateMessage = "No mentors found. Check back soon!",
  loadingCount = 4
}: MentorGridProps) => {
  // Render loading skeletons
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
        {[...Array(loadingCount)].map((_, index) => (
          <MentorCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Render mentors or empty state
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {mentors.length > 0 ? (
        mentors.map((mentor) => (
          <MentorCardWrapper key={mentor.id} mentor={mentor} />
        ))
      ) : (
        <div className="col-span-full">
          <MentorEmptyState message={emptyStateMessage} />
        </div>
      )}
    </div>
  );
});

MentorGrid.displayName = "MentorGrid";

export default MentorGrid;
