
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-full blur-xl animate-float-tech"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-l from-brand-accent/20 to-brand-primary/20 rounded-full blur-2xl animate-float-tech" style={{ animationDelay: '-2s' }}></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="relative pb-16 sm:pb-24 md:pb-32 lg:pb-40">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 lg:mt-24 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
              {/* Text content - left side */}
              <div className="sm:text-center lg:text-left lg:col-span-7">
                <h1 className="text-5xl font-serif font-semibold tracking-tight sm:text-6xl md:text-7xl text-foreground futuristic-glow">
                  <span className="block">Land your dream</span>
                  <span className="block gradient-text animate-pulse-glow">internship</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground sm:text-xl md:mt-8 md:text-xl max-w-md lg:max-w-2xl leading-relaxed">
                  Connect with experienced mentors who've landed roles at top companies like Google, Meta, and BCG.
                  Get personalized guidance for resumes, interviews, and applications.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                  <Button size="lg" className="btn-primary text-base px-8 py-4 futuristic-glow" asChild>
                    <Link to="/mentors">Find a Mentor</Link>
                  </Button>
                  <Button size="lg" className="btn-secondary text-base px-8 py-4" asChild>
                    <Link to="/become-mentor">Become a Mentor</Link>
                  </Button>
                </div>
              </div>
              
              {/* Visual element - right side */}
              <div className="mt-16 lg:mt-0 lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    {/* Enhanced photo with futuristic styling */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl futuristic-glow">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Student working on laptop - representing mentorship and career growth" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-brand-primary/10"></div>
                      {/* Subtle tech overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-primary/5 to-brand-accent/10"></div>
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
