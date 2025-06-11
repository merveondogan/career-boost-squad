
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
              
              {/* Simple path to goal visualization - right side */}
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    
                    {/* Main journey visualization */}
                    <div className="relative w-64 h-64">
                      
                      {/* Starting point - person icon */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center animate-float">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Journey path - zigzag upward */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b45ff" />
                            <stop offset="50%" stopColor="#00d4ff" />
                            <stop offset="100%" stopColor="#39ff14" />
                          </linearGradient>
                        </defs>
                        
                        {/* Main path */}
                        <path 
                          d="M 30 180 L 80 140 L 50 100 L 100 60 L 70 20 L 170 20"
                          stroke="url(#pathGradient)"
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="12,6"
                          className="animate-float"
                          style={{ animationDuration: '4s' }}
                        />
                        
                        {/* Arrow pointing to goal */}
                        <path 
                          d="M 160 20 L 170 15 L 170 25 Z"
                          fill="#39ff14"
                          className="animate-pulse"
                        />
                      </svg>
                      
                      {/* Progress nodes */}
                      <div className="absolute bottom-20 left-20">
                        <div className="w-4 h-4 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                      </div>
                      <div className="absolute bottom-32 left-12">
                        <div className="w-4 h-4 bg-cyber-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      <div className="absolute bottom-44 left-24">
                        <div className="w-4 h-4 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                      
                      {/* Goal - trophy/target */}
                      <div className="absolute top-4 right-8">
                        <div className="relative">
                          {/* Trophy base */}
                          <div className="w-12 h-12 bg-gradient-to-t from-cyber-yellow via-cyber-green to-cyber-cyan rounded-lg flex items-center justify-center animate-float neon-glow">
                            {/* Trophy cup */}
                            <div className="w-6 h-6 bg-gradient-to-br from-cyber-yellow to-cyber-green rounded-t-full border-2 border-cyber-cyan"></div>
                          </div>
                          
                          {/* Success rays */}
                          <div className="absolute -inset-4">
                            <div className="w-20 h-20 border-2 border-cyber-green/30 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute inset-2 w-16 h-16 border-2 border-cyber-cyan/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute inset-4 w-12 h-12 border-2 border-cyber-yellow/50 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating achievement elements */}
                      <div className="absolute top-8 right-4">
                        <div className="w-2 h-2 bg-cyber-green rounded-full animate-float opacity-80" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                      <div className="absolute top-12 right-12">
                        <div className="w-3 h-3 bg-cyber-yellow rounded-full animate-float opacity-70" style={{ animationDelay: '0.8s' }}></div>
                      </div>
                      <div className="absolute top-6 right-16">
                        <div className="w-1.5 h-1.5 bg-cyber-pink rounded-full animate-float opacity-90" style={{ animationDelay: '1.3s' }}></div>
                      </div>
                      
                      {/* Moving progress indicator */}
                      <div className="absolute top-32 left-20">
                        <div className="w-3 h-3 bg-cyber-cyan rounded-full animate-bounce opacity-80">
                          <div className="w-full h-full bg-cyber-cyan rounded-full animate-ping"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple/10 via-transparent to-cyber-green/10 rounded-full"></div>
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
