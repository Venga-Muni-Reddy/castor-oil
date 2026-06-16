import React from 'react';

const Loader = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      {/* Premium organic leaf or drop-inspired loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-600 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
          🌱
        </div>
      </div>
      <p className="text-emerald-800 font-medium animate-pulse text-sm">
        Nurturing your experience...
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-emerald-50/70 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{spinner}</div>;
};

export default Loader;
