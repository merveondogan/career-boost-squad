
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-background via-muted/10 to-background py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10" style={{ backgroundSize: '60px 60px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/5 via-transparent to-cyber-cyan/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-5xl mb-4 bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-pink bg-clip-text text-transparent animate-gradient-shift bg-size-400 font-cyber">
            READY TO BREAK THE SYSTEM?
          </h2>
          <p className="mt-4 text-lg leading-6 text-muted-foreground max-w-2xl mx-auto">
            Join the elite network today and access the insider intelligence you need to dominate 
            the internship battlefield.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="btn-primary animate-pulse-glow" asChild>
              <Link to="/mentors">INITIATE PROTOCOL</Link>
            </Button>
            <Button size="lg" className="btn-secondary" asChild>
              <Link to="/mentors">ACCESS DATABASE</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
