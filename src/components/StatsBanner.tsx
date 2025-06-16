
const StatsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary py-8 relative overflow-hidden">
      {/* Bold animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-4 left-16 w-6 h-6 bg-white/20 rotate-45 animate-magnetic-pull"></div>
      <div className="absolute bottom-4 right-20 w-4 h-8 bg-white/15 animate-magnetic-pull" style={{ animationDelay: '-1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/25 rounded-full animate-magnetic-pull" style={{ animationDelay: '-2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-center">
          <div className="animate-fade-in-bounce card-magnetic group">
            <p className="text-6xl font-serif font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300 text-pop bumble-shadow">500+</p>
            <p className="text-lg font-black text-white/95 group-hover:text-white transition-colors duration-300">Successful Placements</p>
            <div className="w-12 h-1 bg-white/40 mx-auto mt-2 rounded-full group-hover:bg-white/80 transition-colors duration-300"></div>
          </div>
          <div className="animate-fade-in-bounce card-magnetic group" style={{ animationDelay: '0.2s' }}>
            <p className="text-6xl font-serif font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300 text-pop bumble-shadow">50+</p>
            <p className="text-lg font-black text-white/95 group-hover:text-white transition-colors duration-300">Top Companies</p>
            <div className="w-12 h-1 bg-white/40 mx-auto mt-2 rounded-full group-hover:bg-white/80 transition-colors duration-300"></div>
          </div>
          <div className="animate-fade-in-bounce card-magnetic group" style={{ animationDelay: '0.4s' }}>
            <p className="text-6xl font-serif font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300 text-pop bumble-shadow">95%</p>
            <p className="text-lg font-black text-white/95 group-hover:text-white transition-colors duration-300">Success Rate</p>
            <div className="w-12 h-1 bg-white/40 mx-auto mt-2 rounded-full group-hover:bg-white/80 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
