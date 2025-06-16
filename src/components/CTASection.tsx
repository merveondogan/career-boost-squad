
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-brand-primary/5 py-16 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 minimal-grid opacity-30"></div>
      <div className="absolute top-16 right-32 w-32 h-32 bg-gradient-to-r from-brand-accent/8 to-brand-primary/8 rounded-full blur-3xl animate-gentle-float"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-l from-brand-primary/6 to-brand-accent/6 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '-4s' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center glass-card p-10 subtle-glow">
          <h2 className="text-4xl font-serif font-extrabold sm:text-5xl mb-4 text-gray-900">
            Ready to accelerate your career?
          </h2>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who've successfully landed internships at top companies 
            with personalized mentorship and expert guidance.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
            <Button size="lg" className="btn-primary text-base font-bold px-8 py-4" asChild>
              <Link to="/mentors">Find Your Mentor</Link>
            </Button>
            <Button size="lg" className="btn-secondary text-base font-bold px-8 py-4" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
