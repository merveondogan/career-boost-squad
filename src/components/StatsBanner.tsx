
const StatsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-pink py-16 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" style={{ backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-scan"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center animate-float">
            <p className="text-5xl font-extrabold text-white font-cyber neon-glow">500+</p>
            <p className="mt-2 text-lg font-medium text-white/90 font-cyber">SUCCESSFUL PLACEMENTS</p>
          </div>
          <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
            <p className="text-5xl font-extrabold text-white font-cyber neon-glow">50+</p>
            <p className="mt-2 text-lg font-medium text-white/90 font-cyber">TOP COMPANIES</p>
          </div>
          <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
            <p className="text-5xl font-extrabold text-white font-cyber neon-glow">95%</p>
            <p className="mt-2 text-lg font-medium text-white/90 font-cyber">SUCCESS RATE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
