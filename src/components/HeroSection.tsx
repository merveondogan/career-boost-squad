
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" style={{ backgroundSize: '50px 50px' }}></div>
      
      {/* Animated scan line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scan opacity-60"></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
              {/* Text content - left side */}
              <div className="sm:text-center lg:text-left lg:col-span-7">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl animate-neon-pulse">
                  <span className="block">LAND YOUR DREAM</span>
                  <span className="block bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-pink bg-clip-text text-transparent animate-gradient-shift bg-size-400">
                    INTERNSHIP
                  </span>
                </h1>
                <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg md:mt-5 md:text-xl font-cyber max-w-md lg:max-w-none">
                  Connect with experienced mentors who've landed roles at top companies like Google, Meta, and BCG.
                  Get personalized guidance for resumes, interviews, and applications.
                </p>
                <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                  <Button size="lg" className="btn-primary animate-pulse-glow" asChild>
                    <Link to="/mentors">FIND A MENTOR</Link>
                  </Button>
                  <Button size="lg" className="btn-secondary" asChild>
                    <Link to="/become-mentor">BECOME A MENTOR</Link>
                  </Button>
                </div>
              </div>
              
              {/* Tilted Ladder - right side */}
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    
                    {/* Ladder Structure - Tilted to the right */}
                    <div className="relative w-20 h-72 transform rotate-12">
                      {/* Left Rail */}
                      <div className="absolute left-2 top-0 w-2 h-full bg-gradient-to-t from-cyber-purple to-cyber-cyan rounded-full"></div>
                      
                      {/* Right Rail */}
                      <div className="absolute right-2 top-0 w-2 h-full bg-gradient-to-t from-cyber-purple to-cyber-cyan rounded-full"></div>
                      
                      {/* Ladder Rungs - Full width between rails */}
                      <div className="absolute left-2 right-2 top-12 h-1 bg-cyber-cyan rounded"></div>
                      <div className="absolute left-2 right-2 top-20 h-1 bg-cyber-cyan rounded"></div>
                      <div className="absolute left-2 right-2 top-28 h-1 bg-cyber-cyan rounded"></div>
                      <div className="absolute left-2 right-2 top-36 h-1 bg-cyber-cyan rounded"></div>
                      <div className="absolute left-2 right-2 top-44 h-1 bg-cyber-cyan rounded"></div>
                      <div className="absolute left-2 right-2 top-52 h-1 bg-cyber-cyan rounded"></div>
                      <div className="absolute left-2 right-2 top-60 h-1 bg-cyber-cyan rounded"></div>
                      
                      {/* Trophy Icon at Top of Ladder */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
                        <Trophy 
                          size={24} 
                          className="text-cyber-green animate-pulse" 
                          fill="currentColor"
                        />
                      </div>
                    </div>
                    
                    {/* Person Climbing - Positioned outside tilted container */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-4 animate-float">
                      {/* Head */}
                      <div className="w-6 h-6 bg-cyber-pink rounded-full mx-auto"></div>
                      {/* Body */}
                      <div className="w-8 h-10 bg-cyber-pink rounded-t-lg mx-auto"></div>
                      {/* Legs */}
                      <div className="absolute bottom-0 left-0 w-2 h-5 bg-cyber-pink rounded"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-5 bg-cyber-pink rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
