
import { memo } from "react";
import { MentorProps } from "../MentorCard";
import MentorCard from "../MentorCard";

interface MentorCardWrapperProps {
  mentor: MentorProps;
}

/**
 * A wrapper for the MentorCard component providing additional functionality
 * like analytics tracking, click handlers, etc. can be added here
 */
const MentorCardWrapper = memo(({ mentor }: MentorCardWrapperProps) => {
  return <MentorCard key={mentor.id} mentor={mentor} />;
});

MentorCardWrapper.displayName = "MentorCardWrapper";

export default MentorCardWrapper;
