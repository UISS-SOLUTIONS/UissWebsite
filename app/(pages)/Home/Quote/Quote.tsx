import React from "react";

const Quote = () => {
  return (
    <div className="bg-white flex justify-center items-center py-10 text-white">
      <div className="w-[75%]">
        <div className="w-full mt-10 flex justify-center">
          <div className="bg-black flex flex-col items-center w-[60%] rounded-lg">
            <div className="w-[85%]">
              <p className="text-justify pt-8 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                odit ea nulla veniam dolorum doloremque magni nesciunt et ad
                debitis. Soluta recusandae ducimus provident cupiditate fugiat
                modi animi obcaecati cum, illo totam praesentium, labore eum ab
                explicabo laborum exercitationem. Quam deleniti architecto
                ducimus cumque quod!
              </p>
              <div className="flex flex-col pb-8 pt-4">
                <span className="text-white font-semibold">Moody A Mshana</span>
                <span className="text-white font-semibold">Website Technical Lead UISS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
