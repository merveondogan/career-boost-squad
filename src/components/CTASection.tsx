
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-brand-primary/10 via-background to-brand-accent/10 py-20 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-10 right-20 w-40 h-40 bg-gradient-to-r from-brand-accent/20 to-brand-primary/20 rounded-full blur-2xl animate-float-tech"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-gradient-to-l from-brand-primary/15 to-brand-accent/15 rounded-full blur-3xl animate-float-tech" style={{ animationDelay: '-3s' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center glass-effect rounded-3xl p-12">
          <h2 className="text-4xl font-serif font-semibold sm:text-5xl mb-6 gradient-text futuristic-glow">
            Ready to accelerate your career?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who've successfully landed internships at top companies 
            with personalized mentorship and expert guidance.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Button size="lg" className="btn-primary text-base px-8 py-4 futuristic-glow" asChild>
              <Link to="/mentors">Find Your Mentor</Link>
            </Button>
            <Button size="lg" className="btn-secondary text-base px-8 py-4" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
