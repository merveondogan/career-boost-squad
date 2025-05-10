
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Star, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow"> {/* Add padding to account for fixed navbar */}
        {/* Hero Section */}
        <section className="bg-brand-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
                About PeerCoach
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connecting ambitious students with recent graduates who have successfully 
                navigated the path to top tech internships and jobs.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Students collaborating" 
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that every student deserves access to personalized career guidance from 
                  those who have recently walked the path they aspire to follow.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  PeerCoach was founded to bridge the gap between ambitious students and recent 
                  graduates from top tech companies, creating a community where knowledge is shared, 
                  connections are made, and careers are launched.
                </p>
                <p className="text-lg text-gray-600">
                  Our platform makes it easy for students to find mentors who can provide targeted 
                  advice on resume building, interview preparation, and navigating the application 
                  process for specific companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at PeerCoach
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center items-center w-12 h-12 bg-brand-light rounded-full mb-4 mx-auto">
                  <Users className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Community</h3>
                <p className="text-gray-600 text-center">
                  Building a supportive network where knowledge is freely shared and everyone can succeed.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center items-center w-12 h-12 bg-brand-light rounded-full mb-4 mx-auto">
                  <Shield className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Trust</h3>
                <p className="text-gray-600 text-center">
                  Creating a platform where all interactions are built on honesty and reliability.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center items-center w-12 h-12 bg-brand-light rounded-full mb-4 mx-auto">
                  <Star className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Excellence</h3>
                <p className="text-gray-600 text-center">
                  Striving for the highest quality in every mentorship session and interaction.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center items-center w-12 h-12 bg-brand-light rounded-full mb-4 mx-auto">
                  <Globe className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Accessibility</h3>
                <p className="text-gray-600 text-center">
                  Making quality mentorship accessible to students regardless of background.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the passionate people behind PeerCoach
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                  alt="Team Member" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-center mb-1">Alex Johnson</h3>
                <p className="text-brand-primary text-center mb-3">Co-Founder & CEO</p>
                <p className="text-gray-600 text-center">
                  Former SWE intern at Google, passionate about connecting students with the right mentors.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                  alt="Team Member" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-center mb-1">Maya Patel</h3>
                <p className="text-brand-primary text-center mb-3">Co-Founder & CTO</p>
                <p className="text-gray-600 text-center">
                  Previously at Microsoft, Maya leads our technical development with a focus on creating intuitive user experiences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Team Member" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-center mb-1">Jamie Lee</h3>
                <p className="text-brand-primary text-center mb-3">Head of Mentor Relations</p>
                <p className="text-gray-600 text-center">
                  With experience at Amazon, Jamie ensures our platform connects students with the best mentors possible.
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

export default AboutUs;
