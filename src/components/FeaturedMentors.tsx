
import { useState } from "react";
import MentorCard, { MentorProps } from "./MentorCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Updated mentor data with new people
const sampleMentors: MentorProps[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    role: "Data Science Intern",
    company: "Microsoft",
    school: "MIT",
    rate: 55,
    specialties: ["Python", "Machine Learning", "Resume Review"],
    rating: 4.7,
    reviewCount: 23
  },
  {
    id: "2",
    name: "Jason Park",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    role: "Frontend Engineer",
    company: "Airbnb",
    school: "Carnegie Mellon",
    rate: 70,
    specialties: ["React", "UI/UX", "Technical Interviews"],
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: "3",
    name: "Zoe Williams",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    role: "Marketing Intern",
    company: "Spotify",
    school: "NYU",
    rate: 50,
    specialties: ["Content Strategy", "Social Media", "Resume Review"],
    rating: 4.8,
    reviewCount: 18
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
