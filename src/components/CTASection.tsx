
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-brand-primary/5 via-background to-brand-accent/5 py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-serif font-semibold sm:text-5xl mb-6 text-foreground">
            Ready to accelerate your career?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who've successfully landed internships at top companies 
            with personalized mentorship and expert guidance.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Button size="lg" className="btn-primary text-base px-8 py-4" asChild>
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
