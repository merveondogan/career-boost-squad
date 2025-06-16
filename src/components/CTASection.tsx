
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-brand-primary/5 py-12 relative overflow-hidden">
      {/* Bold background elements */}
      <div className="absolute top-12 right-20 w-40 h-40 bg-gradient-to-r from-brand-accent/15 to-brand-primary/15 organic-blob animate-blob-morph opacity-70"></div>
      <div className="absolute bottom-16 left-16 w-32 h-32 bg-gradient-to-l from-brand-primary/12 to-brand-accent/12 organic-blob animate-blob-morph opacity-60" style={{ animationDelay: '-4s' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center glass-card p-8 subtle-glow card-magnetic bumble-shadow">
          <h2 className="text-4xl font-serif font-black sm:text-5xl mb-3 text-gray-900">
            Ready to <span className="gradient-text">accelerate</span> your career?
          </h2>
          <p className="mt-3 text-lg font-black leading-relaxed text-gray-700 max-w-2xl mx-auto">
            Join <span className="text-brand-primary text-xl">thousands of students</span> who've successfully landed internships at top companies 
            with <span className="text-brand-accent text-xl">personalized mentorship</span> and expert guidance.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-col sm:flex-row">
            <Button size="lg" className="btn-primary text-base font-black px-10 py-4 bumble-shadow" asChild>
              <Link to="/mentors">Find Your Mentor</Link>
            </Button>
            <Button size="lg" className="btn-secondary text-base font-black px-10 py-4" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          
          {/*   success indicators */}
          <div className="mt-6 flex justify-center items-center gap-6 text-sm font-bold text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Instant Matching</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Guaranteed Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
