import React from "react";

const ComingSoon = () => {
  return (
    <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-3">
      <div className="w-[400px] h-[320px]">
        <img src="/hat.png" alt="" className="h-full w-full object-cover"/>
      </div>
      <div className="text-7xl font-bold flex flex-col uppercase gap-3">
        <span className="text-white">
          Under <span className="text-ternary">Construction</span>
        </span>
        <span className="text-white/70 text-6xl capitalize">Coming Soon.</span>
      </div>
    </div>
  );
};

export default ComingSoon;
