
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
    <section className="py-16 bg-gradient-to-b from-background to-muted/20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5" style={{ backgroundSize: '100px 100px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber">
            Your path to success in four simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.id} className="cyberpunk-border p-6 rounded-lg card-hover animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-cyber-purple to-cyber-cyan rounded-full mb-4 mx-auto neon-glow">
                <step.icon className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-cyber-cyan font-cyber">{step.title}</h3>
              <p className="text-muted-foreground text-center text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
