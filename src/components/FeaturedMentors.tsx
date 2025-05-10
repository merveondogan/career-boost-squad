
import { useState } from "react";
import MentorCard, { MentorProps } from "./MentorCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Sample mentor data
const sampleMentors: MentorProps[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Software Engineer Intern",
    company: "Google",
    school: "Stanford University",
    rate: 60,
    specialties: ["Resume Review", "Mock Interview", "Technical Prep"],
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Product Manager",
    company: "Meta",
    school: "UC Berkeley",
    rate: 75,
    specialties: ["Product Case Studies", "PM Interview Prep", "Resume Review"],
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: "3",
    name: "Sophia Patel",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Business Analyst Intern",
    company: "BCG",
    school: "Harvard University",
    rate: 65,
    specialties: ["Case Interviews", "Resume Review", "Career Strategy"],
    rating: 5.0,
    reviewCount: 32
  }
];

const FeaturedMentors = () => {
  const [displayedMentors] = useState<MentorProps[]>(sampleMentors);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Featured Mentors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from peers who've successfully landed internships at top companies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/mentors">Browse All Mentors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentors;
