
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
                <span className="block">HACK YOUR WAY TO</span>
                <span className="block bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-pink bg-clip-text text-transparent animate-gradient-shift bg-size-400">
                  ELITE INTERNSHIPS
                </span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0 md:mt-5 md:text-xl font-cyber">
                Connect with elite mentors who've infiltrated top-tier companies like Google, Meta, and BCG.
                Access classified strategies for resumes, interviews, and application exploits.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <Button size="lg" className="btn-primary animate-pulse-glow" asChild>
                  <Link to="/mentors">INITIATE CONNECTION</Link>
                </Button>
                <Button size="lg" className="btn-secondary" asChild>
                  <Link to="/become-mentor">JOIN THE NETWORK</Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Futuristic image overlay */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-cyber-purple/20 via-cyber-cyan/10 to-transparent"></div>
          <img
            className="absolute inset-0 h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-80"
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80"
            alt="Futuristic tech interface"
          />
          {/* Overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
