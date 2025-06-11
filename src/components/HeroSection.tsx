
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
              
              {/* Abstract progression visualization - right side */}
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    
                    {/* Central ascending spiral representing growth */}
                    <div className="relative w-64 h-64">
                      {/* Main ascending path */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="progressGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b45ff" stopOpacity="0.8"/>
                            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="#ff007f" stopOpacity="1"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Ascending spiral path */}
                        <path 
                          d="M 100 180 Q 80 160 90 140 Q 110 120 100 100 Q 90 80 110 60 Q 130 40 100 20"
                          stroke="url(#progressGrad)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="10,5"
                          className="animate-float"
                        />
                        
                        {/* Progress nodes */}
                        <circle cx="100" cy="180" r="4" fill="#8b45ff" className="animate-pulse" style={{ animationDelay: '0s' }}>
                          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="90" cy="140" r="5" fill="#00d4ff" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
                          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="100" cy="100" r="6" fill="#00d4ff" className="animate-pulse" style={{ animationDelay: '1s' }}>
                          <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="110" cy="60" r="7" fill="#ff007f" className="animate-pulse" style={{ animationDelay: '1.5s' }}>
                          <animate attributeName="r" values="7;9;7" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="100" cy="20" r="8" fill="#ff007f" className="neon-glow animate-pulse" style={{ animationDelay: '2s' }}>
                          <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                      
                      {/* Connection lines representing mentorship */}
                      <div className="absolute inset-0">
                        {/* Mentor connection lines */}
                        <div className="absolute top-12 left-8 w-16 h-0.5 bg-gradient-to-r from-cyber-purple/60 to-transparent transform rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-20 right-12 w-20 h-0.5 bg-gradient-to-l from-cyber-cyan/60 to-transparent transform -rotate-30 animate-float" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-32 left-4 w-18 h-0.5 bg-gradient-to-r from-cyber-cyan/60 to-transparent transform rotate-60 animate-float" style={{ animationDelay: '1.5s' }}></div>
                        <div className="absolute top-40 right-8 w-14 h-0.5 bg-gradient-to-l from-cyber-pink/60 to-transparent transform -rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
                      </div>
                      
                      {/* Floating opportunity particles */}
                      <div className="absolute top-16 right-20 w-2 h-2 bg-cyber-cyan rounded-full animate-float opacity-60" style={{ animationDelay: '0.8s' }}></div>
                      <div className="absolute top-28 left-16 w-1.5 h-1.5 bg-cyber-purple rounded-full animate-float opacity-70" style={{ animationDelay: '1.3s' }}></div>
                      <div className="absolute top-44 right-16 w-2.5 h-2.5 bg-cyber-pink rounded-full animate-float opacity-80" style={{ animationDelay: '1.8s' }}></div>
                      <div className="absolute top-8 left-24 w-1 h-1 bg-cyber-cyan rounded-full animate-float opacity-50" style={{ animationDelay: '2.3s' }}></div>
                      
                      {/* Success emanation rings */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full border border-cyber-pink/30 animate-ping" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute inset-2 w-12 h-12 rounded-full border border-cyber-cyan/40 animate-ping" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute inset-4 w-8 h-8 rounded-full border border-cyber-purple/50 animate-ping" style={{ animationDelay: '2s' }}></div>
                      </div>
                    </div>
                    
                    {/* Ambient lighting effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/5 via-transparent to-cyber-cyan/5"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
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
