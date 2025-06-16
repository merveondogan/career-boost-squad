
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
    color: "from-brand-primary to-brand-accent",
    bgColor: "from-brand-primary/10 to-brand-accent/10"
  },
  {
    id: 2,
    title: "BOOK A SESSION",
    description: "Schedule personalized sessions for career guidance. Choose from resume reviews, mock interviews, or strategic career consultations.",
    icon: Calendar,
    color: "from-brand-accent to-brand-primary",
    bgColor: "from-brand-accent/10 to-brand-primary/10"
  },
  {
    id: 3,
    title: "GET PERSONALIZED HELP",
    description: "Connect with your chosen mentor through our platform. Receive insider insights and expert guidance tailored to your goals.",
    icon: Zap,
    color: "from-brand-primary to-brand-accent",
    bgColor: "from-brand-primary/10 to-brand-accent/10"
  },
  {
    id: 4,
    title: "LAND YOUR DREAM ROLE",
    description: "Apply your enhanced knowledge and materials to submit outstanding applications and excel in interviews.",
    icon: Rocket,
    color: "from-brand-accent to-brand-primary",
    bgColor: "from-brand-accent/10 to-brand-primary/10"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-8 bg-white relative overflow-hidden">
      {/* Bold background elements */}
      <div className="absolute top-16 left-1/4 w-24 h-24 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 organic-blob animate-blob-morph opacity-60"></div>
      <div className="absolute bottom-16 right-1/4 w-32 h-32 bg-gradient-to-l from-brand-accent/8 to-brand-primary/8 organic-blob animate-blob-morph opacity-50" style={{ animationDelay: '-3s' }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-12 w-3 h-8 bg-brand-accent rotate-12 animate-magnetic-pull opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-extrabold mb-2 text-gray-900">
            HOW IT WORKS
          </h2>
          <p className="text-xl font-bold text-gray-700 max-w-3xl mx-auto">
            Your path to success in four <span className="gradient-text">simple steps</span>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.id} className={`glass-card p-4 card-hover card-magnetic subtle-glow animate-fade-in-bounce bumble-shadow relative overflow-hidden`} style={{ animationDelay: `${index * 0.15}s` }}>
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                <div className={`flex justify-center items-center w-14 h-14 bg-gradient-to-r ${step.color} rounded-2xl mb-3 mx-auto transform hover:scale-110 hover:rotate-12 transition-all duration-300 bumble-shadow`}>
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <div className="absolute top-2 right-2 text-6xl font-black text-brand-primary/10">
                  {step.id}
                </div>
                <h3 className="text-lg font-black text-center mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-700 text-center text-sm font-semibold leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
