
import { 
  CheckCircle,
  Calendar,
  MessageSquare,
  FileText
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Find Your Ideal Mentor",
    description: "Browse our network of mentors who recently landed internships at top companies. Filter by company, role, or expertise.",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Schedule a Session",
    description: "Book a time that works for you. Choose from resume reviews, mock interviews, or general advice sessions.",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Connect and Learn",
    description: "Meet your mentor through our integrated video platform. Get personalized guidance and insider tips.",
    icon: MessageSquare,
  },
  {
    id: 4,
    title: "Apply with Confidence",
    description: "Use your new knowledge and materials to submit stronger applications and ace your interviews.",
    icon: FileText,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to connect with experienced mentors in just a few steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center items-center w-12 h-12 bg-brand-light rounded-full mb-4 mx-auto">
                <step.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
