
const StatsBanner = () => {
  return (
    <div className="bg-brand-primary py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
          <div className="animate-fade-in">
            <p className="text-5xl font-serif font-semibold text-white mb-2">500+</p>
            <p className="text-lg font-medium text-white/90">Successful Placements</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-5xl font-serif font-semibold text-white mb-2">50+</p>
            <p className="text-lg font-medium text-white/90">Top Companies</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-5xl font-serif font-semibold text-white mb-2">95%</p>
            <p className="text-lg font-medium text-white/90">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
