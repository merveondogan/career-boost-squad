
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to supercharge your internship search?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join PeerCoach today and connect with mentors who can help you land your dream internship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
