
import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Extended mentor data with company logos
const mentorCarouselData = [
  {
    id: "1",
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    company: "Microsoft",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    bgColor: "bg-emerald-100"
  },
  {
    id: "2",
    name: "Jason Park",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    company: "Airbnb",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png",
    bgColor: "bg-orange-100"
  },
  {
    id: "3",
    name: "Zoe Williams",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    company: "Spotify",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/512px-Spotify_logo_without_text.svg.png",
    bgColor: "bg-green-100"
  },
  {
    id: "4",  
    name: "Alex Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    company: "Google",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
    bgColor: "bg-blue-100"
  },
  {
    id: "5",
    name: "Maya Patel",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    company: "Meta",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png",
    bgColor: "bg-purple-100"
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    company: "Netflix",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png",
    bgColor: "bg-red-100"
  },
  {
    id: "7",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/38.jpg",
    company: "Apple",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png",
    bgColor: "bg-slate-100"
  },
  {
    id: "8",
    name: "Michael Torres",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    company: "Tesla",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/512px-Tesla_T_symbol.svg.png",
    bgColor: "bg-yellow-100"
  },
  {
    id: "9",
    name: "Lisa Wang",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    company: "Amazon",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png",
    bgColor: "bg-amber-100"
  },
  {
    id: "10",
    name: "Ryan Martinez",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    company: "Goldman Sachs",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/512px-Goldman_Sachs.svg.png",
    bgColor: "bg-indigo-100"
  }
];

const AnimatedMentorCarousel = memo(() => {
  // Duplicate the array to create seamless loop
  const duplicatedMentors = [...mentorCarouselData, ...mentorCarouselData];

  return (
    <div className="py-4 bg-gradient-to-r from-gray-50 to-white overflow-hidden">
      <div className="text-center mb-4">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          JOIN 250,000+ REAL PEOPLE ACHIEVING THEIR GOALS ON MENTORLAND
        </p>
        <div className="flex justify-center items-center mt-2">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="ml-2 text-sm font-medium text-gray-500">15,738 REVIEWS (AVG 4.98)</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex animate-scroll-infinite">
          {duplicatedMentors.map((mentor, index) => (
            <div
              key={`${mentor.id}-${index}`}
              className={`flex-shrink-0 mx-3 relative ${mentor.bgColor} rounded-full w-24 h-24 flex items-center justify-center`}
            >
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback className="text-lg font-bold">
                  {mentor.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              {/* Company logo badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                <img 
                  src={mentor.companyLogo} 
                  alt={mentor.company} 
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    // Fallback to company initial if logo fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.textContent = mentor.company[0];
                    fallback.className = 'w-5 h-5 flex items-center justify-center text-xs font-bold text-brand-primary';
                    (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

AnimatedMentorCarousel.displayName = "AnimatedMentorCarousel";

export default AnimatedMentorCarousel;
