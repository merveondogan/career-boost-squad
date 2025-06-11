
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
              
              {/* Journey to success visualization - right side */}
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    
                    {/* Success target destination */}
                    <div className="relative w-64 h-64">
                      
                      {/* Main journey path - winding upward */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <defs>
                          <linearGradient id="pathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b45ff" stopOpacity="0.6"/>
                            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#ff007f" stopOpacity="1"/>
                          </linearGradient>
                          <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff007f"/>
                            <stop offset="50%" stopColor="#00d4ff"/>
                            <stop offset="100%" stopColor="#39ff14"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Journey path */}
                        <path 
                          d="M 30 170 Q 60 150 50 130 Q 40 110 70 100 Q 100 90 90 70 Q 80 50 110 40 Q 140 30 130 20 Q 120 10 150 15 Q 170 20 160 10"
                          stroke="url(#pathGrad)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="8,4"
                          className="animate-float"
                          strokeLinecap="round"
                        />
                        
                        {/* Progress markers along the path */}
                        <circle cx="30" cy="170" r="3" fill="#8b45ff" className="animate-pulse">
                          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="50" cy="130" r="4" fill="#8b45ff" className="animate-pulse" style={{ animationDelay: '0.3s' }}>
                          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="90" cy="70" r="5" fill="#00d4ff" className="animate-pulse" style={{ animationDelay: '0.8s' }}>
                          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="130" cy="20" r="6" fill="#ff007f" className="animate-pulse" style={{ animationDelay: '1.2s' }}>
                          <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Success target - bulls-eye design */}
                        <g transform="translate(160, 10)">
                          {/* Outer target ring */}
                          <circle cx="0" cy="0" r="20" fill="none" stroke="url(#targetGrad)" strokeWidth="2" opacity="0.6">
                            <animate attributeName="r" values="20;25;20" dur="3s" repeatCount="indefinite"/>
                          </circle>
                          {/* Middle target ring */}
                          <circle cx="0" cy="0" r="14" fill="none" stroke="url(#targetGrad)" strokeWidth="2" opacity="0.8">
                            <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" begin="1s"/>
                          </circle>
                          {/* Inner target ring */}
                          <circle cx="0" cy="0" r="8" fill="none" stroke="url(#targetGrad)" strokeWidth="2">
                            <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" begin="2s"/>
                          </circle>
                          {/* Bullseye center */}
                          <circle cx="0" cy="0" r="4" fill="url(#targetGrad)" className="neon-glow">
                            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                          </circle>
                        </g>
                      </svg>
                      
                      {/* Moving progress indicator */}
                      <div className="absolute top-32 left-20 w-3 h-3 bg-cyber-cyan rounded-full animate-float opacity-80" style={{ animationDelay: '0s', animationDuration: '4s' }}>
                        <div className="w-full h-full bg-cyber-cyan rounded-full animate-ping"></div>
                      </div>
                      
                      {/* Achievement stars around target */}
                      <div className="absolute top-2 right-8">
                        <div className="w-2 h-2 bg-cyber-pink transform rotate-45 animate-float opacity-70" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      <div className="absolute top-6 right-4">
                        <div className="w-1.5 h-1.5 bg-cyber-yellow transform rotate-45 animate-float opacity-80" style={{ animationDelay: '1s' }}></div>
                      </div>
                      <div className="absolute top-0 right-12">
                        <div className="w-2.5 h-2.5 bg-cyber-green transform rotate-45 animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
                      </div>
                      <div className="absolute top-4 right-0">
                        <div className="w-1 h-1 bg-cyber-cyan transform rotate-45 animate-float opacity-90" style={{ animationDelay: '2s' }}></div>
                      </div>
                      
                      {/* Success emanation from target */}
                      <div className="absolute top-2 right-10">
                        <div className="w-12 h-12 rounded-full border border-cyber-green/40 animate-ping" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute inset-2 w-8 h-8 rounded-full border border-cyber-cyan/50 animate-ping" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute inset-3 w-6 h-6 rounded-full border border-cyber-pink/60 animate-ping" style={{ animationDelay: '2s' }}></div>
                      </div>
                      
                      {/* Starting point indicator */}
                      <div className="absolute bottom-8 left-6">
                        <div className="text-xs text-muted-foreground font-cyber opacity-60">START</div>
                        <div className="w-6 h-0.5 bg-cyber-purple/50 mt-1"></div>
                      </div>
                      
                      {/* Goal indicator */}
                      <div className="absolute top-0 right-0">
                        <div className="text-xs text-cyber-green font-cyber opacity-80 text-right">GOAL</div>
                        <div className="w-8 h-0.5 bg-cyber-green/60 mt-1 ml-auto"></div>
                      </div>
                    </div>
                    
                    {/* Ambient success glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyber-purple/5 via-transparent to-cyber-green/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
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
