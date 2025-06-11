
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
      
      {/* Futuristic geometric design element */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          {/* Animated geometric shapes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyber-purple/30 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyber-cyan rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-cyber-pink rounded-full transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-cyber-cyan/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Inner core */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 backdrop-blur-sm border border-cyber-pink/30 animate-pulse">
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyber-cyan rounded-full animate-float"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyber-pink rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyber-purple rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
          
          {/* Additional light effects */}
          <div className="absolute inset-0 bg-gradient-to-l from-cyber-purple/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
