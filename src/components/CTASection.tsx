
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-brand-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to supercharge your internship search?
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Join Intearn today and connect with mentors who can help you land your dream 
            internship.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/mentors">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
