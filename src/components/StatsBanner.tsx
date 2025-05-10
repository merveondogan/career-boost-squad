
const StatsBanner = () => {
  return (
    <div className="bg-brand-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-white">500+</p>
            <p className="mt-2 text-lg font-medium text-brand-light">Successful matches</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-extrabold text-white">50+</p>
            <p className="mt-2 text-lg font-medium text-brand-light">Top companies</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-extrabold text-white">95%</p>
            <p className="mt-2 text-lg font-medium text-brand-light">Satisfaction rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
