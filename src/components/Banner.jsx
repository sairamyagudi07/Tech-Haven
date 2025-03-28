import React from "react";

const Banner = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden shadow-lg">
      <img src={imageUrl} alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-white text-2xl md:text-4xl font-bold">{title}</h2>
        <p className="text-white text-sm md:text-lg mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
