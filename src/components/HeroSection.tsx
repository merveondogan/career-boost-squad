
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-brand-primary/10 min-h-[90vh]">
      {/* Bold background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 organic-blob animate-blob-morph"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-l from-brand-accent/15 to-brand-primary/15 organic-blob animate-blob-morph" style={{ animationDelay: '-4s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '-2s' }}></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-brand-accent rotate-45 animate-magnetic-pull opacity-60"></div>
      <div className="absolute top-3/4 right-1/3 w-4 h-12 bg-gradient-to-b from-brand-primary to-brand-accent animate-magnetic-pull opacity-50" style={{ animationDelay: '-3s' }}></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="relative pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
              {/* Text content */}
              <div className="sm:text-center lg:text-left lg:col-span-6">
                <h1 className="text-5xl font-serif font-bold tracking-tight sm:text-6xl md:text-7xl text-gray-900 animate-fade-in-bounce">
                  <span className="block mb-2">Land your dream</span>
                  <span className="block gradient-text text-pop">internship</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700 sm:text-xl md:mt-6 md:text-xl max-w-md lg:max-w-2xl leading-relaxed font-medium animate-fade-in-bounce" style={{ animationDelay: '0.2s' }}>
                  Connect with <span className="text-brand-primary font-bold">experienced mentors</span> who've landed roles at top companies like Google, Meta, and BCG.
                  Get <span className="text-brand-accent font-bold">personalized guidance</span> for resumes, interviews, and applications.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-start animate-fade-in-bounce" style={{ animationDelay: '0.4s' }}>
                  <Button size="lg" className="btn-primary text-base px-10 py-4 bumble-shadow" asChild>
                    <Link to="/mentors">Find a Mentor</Link>
                  </Button>
                  <Button size="lg" className="btn-secondary text-base px-10 py-4" asChild>
                    <Link to="/become-mentor">Become a Mentor</Link>
                  </Button>
                </div>
              </div>
              
              {/* Visual element */}
              <div className="mt-8 lg:mt-0 lg:col-span-6">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-3xl animate-fade-in-bounce card-magnetic bumble-shadow" style={{ animationDelay: '0.6s' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Student working on laptop - representing mentorship and career growth" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-brand-accent/10"></div>
                      
                      {/* Floating achievement badges */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-brand-primary animate-magnetic-pull">
                        95% Success Rate
                      </div>
                      <div className="absolute bottom-4 left-4 bg-brand-primary/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-white animate-magnetic-pull" style={{ animationDelay: '-2s' }}>
                        500+ Placements
                      </div>
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
