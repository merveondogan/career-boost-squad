
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-7xl animate-neon-pulse">
                <span className="block">LAND YOUR DREAM</span>
                <span className="block bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-pink bg-clip-text text-transparent animate-gradient-shift bg-size-400">
                  INTERNSHIP
                </span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0 md:mt-5 md:text-xl font-cyber">
                Connect with experienced mentors who've landed roles at top companies like Google, Meta, and BCG.
                Get personalized guidance for resumes, interviews, and applications.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <Button size="lg" className="btn-primary animate-pulse-glow" asChild>
                  <Link to="/mentors">FIND A MENTOR</Link>
                </Button>
                <Button size="lg" className="btn-secondary" asChild>
                  <Link to="/become-mentor">BECOME A MENTOR</Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Career pathway visualization */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          {/* Career progression path */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Main career pathway - vertical progression */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink transform -translate-x-1/2"></div>
              
              {/* Career stages as connected nodes */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-cyber-cyan rounded-full animate-pulse"></div>
                <div className="absolute -left-16 -top-2 text-xs text-cyber-cyan font-cyber opacity-80">STUDENT</div>
              </div>
              
              <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                <div className="w-5 h-5 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -right-20 -top-2 text-xs text-cyber-purple font-cyber opacity-80">INTERN</div>
              </div>
              
              <div className="absolute top-52 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -left-24 -top-2 text-xs text-cyber-pink font-cyber opacity-80">PROFESSIONAL</div>
              </div>
              
              {/* Mentorship connection lines - representing mentor-mentee relationships */}
              <div className="absolute top-16 left-20 w-24 h-px bg-gradient-to-r from-cyber-cyan/60 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-36 right-20 w-32 h-px bg-gradient-to-l from-cyber-purple/60 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-56 left-16 w-28 h-px bg-gradient-to-r from-cyber-pink/60 to-transparent animate-pulse" style={{ animationDelay: '2.5s' }}></div>
              
              {/* Mentor nodes */}
              <div className="absolute top-16 left-12 w-2 h-2 bg-cyber-cyan/80 rounded-full animate-float"></div>
              <div className="absolute top-36 right-12 w-2 h-2 bg-cyber-purple/80 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-56 left-8 w-2 h-2 bg-cyber-pink/80 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              
              {/* Success indicators - representing achievements */}
              <div className="absolute top-20 right-32 w-1 h-1 bg-cyber-cyan rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
              <div className="absolute top-40 left-24 w-1 h-1 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '3.5s' }}></div>
              <div className="absolute top-60 right-28 w-1 h-1 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
              
              {/* Network effect - subtle connecting lines */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-8 h-px bg-cyber-cyan/40 transform rotate-45 animate-float"></div>
                <div className="absolute top-1/2 right-1/3 w-12 h-px bg-cyber-purple/40 transform -rotate-30 animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 left-1/3 w-10 h-px bg-cyber-pink/40 transform rotate-60 animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Ambient lighting effects */}
          <div className="absolute inset-0 bg-gradient-to-l from-cyber-purple/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
