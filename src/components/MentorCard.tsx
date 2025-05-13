
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export interface MentorProps {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  company: string;
  school: string;
  rate: number;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

const MentorCard = ({ mentor }: { mentor: MentorProps }) => {
  const { id, name, avatar, role, company, school, rate, specialties, rating, reviewCount } = mentor;
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              {/* Name is now the primary heading element with large bold text */}
              <h2 className="text-xl font-bold">{name}</h2>
              {/* Role and company displayed properly, fixed the duplication */}
              <p className="text-sm text-gray-500">{role} at {company}</p>
              <p className="text-sm text-gray-500">{school}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-brand-primary">${rate}/hr</div>
            <div className="flex items-center justify-end mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-brand-light text-brand-primary">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/mentor/${id}`}>View Profile</Link>
        </Button>
        <Button asChild>
          <Link to={`/book/${id}`}>Book Session</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
