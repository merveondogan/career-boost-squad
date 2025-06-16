
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
    <section className="py-16 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-full blur-2xl animate-float-tech"></div>
      <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-gradient-to-l from-brand-accent/20 to-brand-primary/20 rounded-full blur-xl animate-float-tech" style={{ animationDelay: '-1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-semibold mb-4 gradient-text futuristic-glow">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your path to success in four simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.id} className="glass-effect p-6 rounded-xl card-hover futuristic-glow animate-float-tech" style={{ animationDelay: `${index * 0.3}s` }}>
              <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full mb-4 mx-auto animate-pulse-glow">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 gradient-text">{step.title}</h3>
              <p className="text-muted-foreground text-center text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
