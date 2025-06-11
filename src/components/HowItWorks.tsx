
import { 
  Target,
  Calendar,
  Zap,
  Rocket
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "TARGET ACQUISITION",
    description: "Scan our database of elite operatives who've successfully infiltrated Fortune 500 companies. Filter by expertise, company access, or specialization.",
    icon: Target,
  },
  {
    id: 2,
    title: "SCHEDULE OPERATION",
    description: "Book encrypted sessions for intelligence briefings. Choose from resume optimization, interview simulation, or strategic consultation protocols.",
    icon: Calendar,
  },
  {
    id: 3,
    title: "EXECUTE CONNECTION",
    description: "Engage with your assigned operative through our secure platform. Receive classified insights and insider intelligence.",
    icon: Zap,
  },
  {
    id: 4,
    title: "LAUNCH MISSION",
    description: "Deploy your enhanced arsenal of knowledge and materials to execute flawless applications and dominate interviews.",
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
            OPERATION PROTOCOL
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber">
            Execute the perfect infiltration strategy in four synchronized phases
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
