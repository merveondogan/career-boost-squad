
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-[90vh]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 minimal-grid opacity-50"></div>
      
      {/* Floating elements - more subtle */}
      <div className="absolute top-32 left-12 w-16 h-16 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-full blur-xl animate-gentle-float"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-l from-brand-accent/8 to-brand-primary/8 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: '-3s' }}></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="relative pb-16 sm:pb-24 md:pb-32 lg:pb-40">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 lg:mt-24 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Text content */}
              <div className="sm:text-center lg:text-left lg:col-span-6">
                <h1 className="text-5xl font-serif font-semibold tracking-tight sm:text-6xl md:text-7xl text-gray-900 animate-fade-in-up">
                  <span className="block">Land your dream</span>
                  <span className="block gradient-text">internship</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 sm:text-xl md:mt-8 md:text-xl max-w-md lg:max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Connect with experienced mentors who've landed roles at top companies like Google, Meta, and BCG.
                  Get personalized guidance for resumes, interviews, and applications.
                </p>
                <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <Button size="lg" className="btn-primary text-base px-8 py-4" asChild>
                    <Link to="/mentors">Find a Mentor</Link>
                  </Button>
                  <Button size="lg" className="btn-secondary text-base px-8 py-4" asChild>
                    <Link to="/become-mentor">Become a Mentor</Link>
                  </Button>
                </div>
              </div>
              
              {/* Visual element */}
              <div className="mt-16 lg:mt-0 lg:col-span-6">
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="relative h-80 lg:h-96 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                        alt="Student working on laptop - representing mentorship and career growth" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-brand-primary/5"></div>
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
