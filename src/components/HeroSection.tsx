
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
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
              {/* Text content - left side */}
              <div className="sm:text-center lg:text-left lg:col-span-6">
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
              
              {/* Career progression visualization - right side */}
              <div className="mt-12 lg:mt-0 lg:col-span-6">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  <div className="relative h-80 lg:h-96">
                    {/* Central career pathway */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-80 h-80">
                        {/* Main progression line */}
                        <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink transform -translate-x-1/2"></div>
                        
                        {/* Student stage */}
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex items-center">
                          <div className="w-4 h-4 bg-cyber-cyan rounded-full animate-pulse shadow-lg"></div>
                          <div className="ml-4 text-sm text-cyber-cyan font-cyber font-semibold opacity-90">STUDENT</div>
                        </div>
                        
                        {/* Mentorship connection */}
                        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex items-center">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-cyber-cyan/60 to-cyber-purple/60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-2 h-2 bg-cyber-purple/80 rounded-full ml-2"></div>
                          <div className="ml-2 text-xs text-cyber-purple/80 font-cyber">MENTOR</div>
                        </div>
                        
                        {/* Intern stage */}
                        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 flex items-center">
                          <div className="w-5 h-5 bg-cyber-purple rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                          <div className="ml-4 text-sm text-cyber-purple font-cyber font-semibold opacity-90">INTERN</div>
                        </div>
                        
                        {/* Career growth connection */}
                        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 flex items-center">
                          <div className="w-20 h-0.5 bg-gradient-to-r from-cyber-purple/60 to-cyber-pink/60 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                          <div className="w-2 h-2 bg-cyber-pink/80 rounded-full ml-2"></div>
                          <div className="ml-2 text-xs text-cyber-pink/80 font-cyber">GROWTH</div>
                        </div>
                        
                        {/* Professional stage */}
                        <div className="absolute top-64 left-1/2 transform -translate-x-1/2 flex items-center">
                          <div className="w-6 h-6 bg-cyber-pink rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2s' }}></div>
                          <div className="ml-4 text-sm text-cyber-pink font-cyber font-semibold opacity-90">PROFESSIONAL</div>
                        </div>
                        
                        {/* Success indicators */}
                        <div className="absolute top-16 right-20 w-1 h-1 bg-cyber-cyan rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                        <div className="absolute top-44 right-16 w-1 h-1 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
                        <div className="absolute top-68 right-12 w-1 h-1 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '3.5s' }}></div>
                        
                        {/* Network connections */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/4 left-1/4 w-8 h-0.5 bg-cyber-cyan/40 transform rotate-45 animate-float"></div>
                          <div className="absolute top-1/2 right-1/3 w-12 h-0.5 bg-cyber-purple/40 transform -rotate-30 animate-float" style={{ animationDelay: '1s' }}></div>
                          <div className="absolute bottom-1/3 left-1/3 w-10 h-0.5 bg-cyber-pink/40 transform rotate-60 animate-float" style={{ animationDelay: '2s' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ambient lighting effects */}
                    <div className="absolute inset-0 bg-gradient-to-l from-cyber-purple/5 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
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
