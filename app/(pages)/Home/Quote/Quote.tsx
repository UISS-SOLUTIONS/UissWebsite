import React from "react";

const Quote = () => {
  return (
    <div className="bg-[#efb631] flex justify-center items-center pt-10 pb-20 text-black ">
      <div className="w-[1161px] relative">
        <div className="w-full mt-8 flex justify-center">
          <div className="flex flex-col items-center w-[65%] rounded-lg z-10">
            <div className="w-[80%]">
              <p className="text-justify pt-8 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                odit ea nulla veniam dolorum doloremque magni nesciunt et ad
                debitis. Soluta recusandae ducimus provident cupiditate fugiat
                modi animi obcaecati cum, illo totam praesentium, labore eum ab
                explicabo laborum exercitationem. Quam deleniti architecto
                ducimus cumque quod!
              </p>
              <div className="flex flex-col items-end pb-8 pt-4">
                <span className="text-black font-semibold">Moody A Mshana</span>
                <span className="text-black font-semibold">
                  Website Technical Lead UISS
                </span>
              </div>
            </div>
          </div>
        </div>
      <div className="absolute top-[7%] left-[17%]">
        <img src="./quoteBg.svg" alt="" />
      </div>
      </div>
    </div>
  );
};

export default Quote;
