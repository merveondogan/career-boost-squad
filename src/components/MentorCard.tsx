
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

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
  const { id, name, avatar, role, company, school, rate, specialties, reviewCount } = mentor;
  
  // Generate initials from the name
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
              {/* Display full name as the main heading */}
              <h2 className="text-xl font-bold">{name}</h2>
              {/* Role and company displayed as secondary information */}
              <p className="text-sm text-gray-500">{role} at {company}</p>
              <p className="text-sm text-gray-500">{school}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-brand-primary">${rate}/hr</div>
            <div className="flex items-center justify-end mt-1">
              <div className="flex">
                {/* Always render 5 filled stars regardless of actual rating */}
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
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
