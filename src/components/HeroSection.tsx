
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
              
              {/* Goal achievement visualization - right side */}
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    
                    {/* Main journey visualization */}
                    <div className="relative w-64 h-64">
                      
                      {/* Starting point - person/individual */}
                      <div className="absolute bottom-8 left-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center animate-float">
                          {/* Simple person silhouette */}
                          <div className="w-3 h-3 bg-white rounded-full mb-1"></div>
                        </div>
                        <div className="w-8 h-4 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-b-full mx-1 mt-1"></div>
                      </div>
                      
                      {/* Journey path - ascending steps/ladder */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b45ff" />
                            <stop offset="50%" stopColor="#00d4ff" />
                            <stop offset="100%" stopColor="#39ff14" />
                          </linearGradient>
                        </defs>
                        
                        {/* Step-like path representing progress/growth */}
                        <path 
                          d="M 40 160 L 70 160 L 70 120 L 100 120 L 100 80 L 130 80 L 130 40 L 160 40"
                          stroke="url(#pathGradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-float"
                          style={{ animationDuration: '3s' }}
                        />
                        
                        {/* Arrow pointing to goal */}
                        <path 
                          d="M 150 40 L 160 35 L 160 45 Z"
                          fill="#39ff14"
                          className="animate-pulse"
                        />
                      </svg>
                      
                      {/* Goal symbol - target/bullseye */}
                      <div className="absolute top-6 right-6">
                        <div className="relative">
                          {/* Outer ring */}
                          <div className="w-16 h-16 border-4 border-cyber-green rounded-full animate-float flex items-center justify-center">
                            {/* Middle ring */}
                            <div className="w-10 h-10 border-3 border-cyber-cyan rounded-full flex items-center justify-center">
                              {/* Center dot - the bullseye */}
                              <div className="w-4 h-4 bg-cyber-yellow rounded-full neon-glow"></div>
                            </div>
                          </div>
                          
                          {/* Success rays emanating from target */}
                          <div className="absolute -inset-4">
                            <div className="w-24 h-24 border-2 border-cyber-green/30 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute inset-2 w-20 h-20 border-2 border-cyber-cyan/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Milestone markers along the path */}
                      <div className="absolute bottom-32 left-16">
                        <div className="w-3 h-3 bg-cyber-purple rounded-sm rotate-45 animate-pulse" style={{ animationDelay: '0s' }}></div>
                      </div>
                      <div className="absolute bottom-20 left-24">
                        <div className="w-3 h-3 bg-cyber-cyan rounded-sm rotate-45 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                      </div>
                      <div className="absolute bottom-12 left-32">
                        <div className="w-3 h-3 bg-cyber-pink rounded-sm rotate-45 animate-pulse" style={{ animationDelay: '1.4s' }}></div>
                      </div>
                      
                      {/* Upward momentum indicators */}
                      <div className="absolute top-16 right-12">
                        <div className="flex flex-col space-y-1">
                          <div className="w-2 h-2 bg-cyber-green opacity-60 animate-float" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-cyber-yellow opacity-70 animate-float" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-2 h-2 bg-cyber-cyan opacity-80 animate-float" style={{ animationDelay: '0.8s' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ambient success glow */}
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
