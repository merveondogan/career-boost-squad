
import { 
  Target,
  Calendar,
  Zap,
  Rocket
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "FIND YOUR MENTOR",
    description: "Browse our database of successful mentors who've landed roles at top companies. Filter by expertise, company experience, or specialization.",
    icon: Target,
  },
  {
    id: 2,
    title: "BOOK A SESSION",
    description: "Schedule personalized sessions for career guidance. Choose from resume reviews, mock interviews, or strategic career consultations.",
    icon: Calendar,
  },
  {
    id: 3,
    title: "GET PERSONALIZED HELP",
    description: "Connect with your chosen mentor through our platform. Receive insider insights and expert guidance tailored to your goals.",
    icon: Zap,
  },
  {
    id: 4,
    title: "LAND YOUR DREAM ROLE",
    description: "Apply your enhanced knowledge and materials to submit outstanding applications and excel in interviews.",
    icon: Rocket,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Minimal background pattern */}
      <div className="absolute inset-0 minimal-grid opacity-20"></div>
      <div className="absolute top-20 left-1/3 w-24 h-24 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-full blur-2xl animate-gentle-float"></div>
      <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-l from-brand-accent/5 to-brand-primary/5 rounded-full blur-xl animate-gentle-float" style={{ animationDelay: '-2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold mb-3 text-gray-900">
            HOW IT WORKS
          </h2>
          <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto">
            Your path to success in four simple steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.id} className="glass-card p-5 card-hover subtle-glow animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full mb-3 mx-auto">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-center text-sm font-medium leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
