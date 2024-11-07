import React from "react";

function Home() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-[200px] h-[170px] mb-4">
          <img src="/logoUISS.png" alt="" className="w-full h-full object-fit" />
        </div>
        <h1 className="text-6xl font-bold">UISS WEBSITE</h1>
        <h4 className="text-xl text-center mt-4 text-[#f7d136]">Still under construction</h4>
        <div className="mt-8 opacity-50">
          <p className="text-lg">
            We're working hard to bring you the best experience.
          </p>
          <p className="text-lg">Stay tuned for the launch in 6 weeks!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
