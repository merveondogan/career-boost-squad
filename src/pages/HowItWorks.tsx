
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksComponent from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow"> {/* Add padding to account for fixed navbar */}
        {/* Hero Section */}
        <section className="bg-brand-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
                How PeerCoach Works
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your path to landing your dream internship or job, guided by peers who've been there
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <HowItWorksComponent />

        {/* Detailed Explanation */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">The PeerCoach Experience</h2>
            
            <div className="space-y-16">
              {/* Step 1 Detail */}
              <div className="lg:flex lg:items-center lg:space-x-12">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Finding your mentor" 
                    className="rounded-lg shadow-xl"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Find Your Ideal Mentor</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Our platform hosts a diverse community of mentors who have recently secured roles at top tech companies. 
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2">•</span>
                      <span>Filter by company, role type, or specific skills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2">•</span>
                      <span>View detailed mentor profiles and success stories</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2">•</span>
                      <span>Read reviews from other mentees</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/mentors">Browse Mentors Now</Link>
                  </Button>
                </div>
              </div>
              
              {/* Step 2 Detail */}
              <div className="lg:flex lg:items-center lg:space-x-12 lg:flex-row-reverse">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="Scheduling a session" 
                    className="rounded-lg shadow-xl"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Schedule a Session</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Once you've found a mentor whose experience aligns with your goals, booking a session is simple.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2">•</span>
                      <span>Choose from available session types: resume reviews, mock interviews, or career advice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2">•</span>
                      <span>Select a time slot that fits your schedule</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-primary mr-2">•</span>
                      <span>Prepay securely through our platform</span>
                    </li>
                  </ul>
                  <Button variant="outline" asChild>
                    <Link to="/signup">Create Your Account</Link>
                  </Button>
                </div>
              </div>
              
              {/* Additional steps would follow the same pattern */}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              <div className="py-6">
                <h3 className="text-xl font-semibold text-gray-900">How much does it cost?</h3>
                <p className="mt-2 text-gray-600">
                  Mentors set their own rates based on their experience and the type of session. 
                  Most sessions range from $30-100, with resume reviews typically being the most affordable option.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-xl font-semibold text-gray-900">How long are the sessions?</h3>
                <p className="mt-2 text-gray-600">
                  Most sessions are 30-60 minutes long, depending on the type. Resume reviews may be shorter, 
                  while mock interviews generally take a full hour.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-xl font-semibold text-gray-900">How do I become a mentor?</h3>
                <p className="mt-2 text-gray-600">
                  If you've recently landed a role at a top tech company and want to help others do the same, 
                  we'd love to have you join our mentor community! Sign up and apply through the "Become a Mentor" form.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-xl font-semibold text-gray-900">Can I get a refund if I'm not satisfied?</h3>
                <p className="mt-2 text-gray-600">
                  We have a satisfaction guarantee. If you're not happy with your session, contact us 
                  within 24 hours and we'll work to resolve the issue or provide a refund.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
