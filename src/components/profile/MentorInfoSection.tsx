
import { Badge } from "@/components/ui/badge";

interface MentorInfoSectionProps {
  mentorInfo: {
    company?: string;
    position?: string;
    expertise_areas?: string[];
    experience?: string;
    hourly_rate?: string;
  };
}

const ExperienceLabel: Record<string, string> = {
  "0-1": "0-1 years",
  "1-3": "1-3 years",
  "3-5": "3-5 years",
  "5+": "5+ years"
};

const ExpertiseLabel: Record<string, string> = {
  "resume-review": "Resume Review",
  "interview-prep": "Interview Preparation",
  "career-advice": "Career Advice",
  "technical-skills": "Technical Skills",
  "application-strategy": "Application Strategy",
  "portfolio-review": "Portfolio Review",
  "networking": "Networking",
  "salary-negotiation": "Salary Negotiation"
};

const MentorInfoSection = ({ mentorInfo }: MentorInfoSectionProps) => {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Mentor Information</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentorInfo.company && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Company</h4>
              <p className="mt-1">{mentorInfo.company}</p>
            </div>
          )}
          
          {mentorInfo.position && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Position</h4>
              <p className="mt-1">{mentorInfo.position}</p>
            </div>
          )}
        </div>
        
        {mentorInfo.experience && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Experience</h4>
            <p className="mt-1">{ExperienceLabel[mentorInfo.experience] || mentorInfo.experience}</p>
          </div>
        )}
        
        {mentorInfo.hourly_rate && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Hourly Rate</h4>
            <p className="mt-1">${mentorInfo.hourly_rate}/hour</p>
          </div>
        )}
        
        {mentorInfo.expertise_areas && mentorInfo.expertise_areas.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {mentorInfo.expertise_areas.map((area) => (
                <Badge key={area} variant="outline" className="bg-gray-100">
                  {ExpertiseLabel[area] || area}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorInfoSection;
