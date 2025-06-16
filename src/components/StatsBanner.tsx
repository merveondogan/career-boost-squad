
const StatsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary py-12 relative overflow-hidden">
      {/* Refined overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-center">
          <div className="animate-fade-in-up">
            <p className="text-5xl font-serif font-bold text-white mb-1">500+</p>
            <p className="text-lg font-bold text-white/90">Successful Placements</p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-5xl font-serif font-bold text-white mb-1">50+</p>
            <p className="text-lg font-bold text-white/90">Top Companies</p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-5xl font-serif font-bold text-white mb-1">95%</p>
            <p className="text-lg font-bold text-white/90">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
