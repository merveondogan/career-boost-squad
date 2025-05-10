
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedMentors from "@/components/FeaturedMentors";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import StatsBanner from "@/components/StatsBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <HowItWorks />
        <FeaturedMentors />
        <StatsBanner />
        <Testimonials />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
