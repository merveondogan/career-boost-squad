
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface MentorInfoSectionProps {
  mentorInfo: {
    company?: string;
    position?: string;
    expertise_areas?: string[];
    experience?: string;
    hourly_rate?: string;
    education?: {
      school?: string;
      major?: string;
      graduation_year?: string;
    };
    internships?: Array<{
      id: string;
      company: string;
      role: string;
      start_date: string;
      end_date: string;
      description?: string;
    }>;
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
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };

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
        
        {/* Education Section */}
        {mentorInfo.education && (mentorInfo.education.school || mentorInfo.education.major || mentorInfo.education.graduation_year) && (
          <div className="border-t pt-4 mt-4">
            <h4 className="text-md font-medium mb-3">Education</h4>
            <div className="space-y-2">
              {mentorInfo.education.school && (
                <div>
                  <span className="font-medium">{mentorInfo.education.school}</span>
                  {mentorInfo.education.graduation_year && (
                    <span className="text-gray-600 text-sm ml-2">Class of {mentorInfo.education.graduation_year}</span>
                  )}
                </div>
              )}
              
              {mentorInfo.education.major && (
                <p className="text-gray-700">{mentorInfo.education.major}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Internships Section */}
        {mentorInfo.internships && mentorInfo.internships.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h4 className="text-md font-medium mb-3">Internship Experience</h4>
            <div className="space-y-4">
              {mentorInfo.internships.map((internship) => (
                <div key={internship.id} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{internship.role}</p>
                      <p className="text-gray-700">{internship.company}</p>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {formatDate(internship.start_date)} - {formatDate(internship.end_date)}
                    </p>
                  </div>
                  {internship.description && (
                    <p className="mt-2 text-sm text-gray-600">{internship.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
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
