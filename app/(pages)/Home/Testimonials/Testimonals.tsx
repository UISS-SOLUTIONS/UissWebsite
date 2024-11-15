import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-black flex justify-center items-center py-20 text-black">
      <div className="w-[1161px]">
        <span className=" flex text-4xl cursor-pointer font-semibold border-b-[1px] border-white/30  pb-4 mb-4 text-white">
          Testimonials
        </span>
        <div className="bg-black w-full mt-10 flex justify-center">
          <div className="bg-white flex flex-col items-center w-[80%] text-black rounded-lg">
            <p className="w-[70%] text-justify pt-8 pb-4 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit
              ea nulla veniam dolorum doloremque magni nesciunt et ad debitis.
              Soluta recusandae ducimus provident cupiditate fugiat modi animi
              obcaecati cum, illo totam praesentium, labore eum ab explicabo
              laborum exercitationem. Quam deleniti architecto ducimus cumque
              quod!
            </p>
            <div className="h-[80px] w-[80px] rounded-[50%] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1590735627513-59a186ed0984?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWQlMjBvZiUyMGRlcGFydG1lbnR8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-y-[2px] mt-4 mb-6">
                <span className="font-semibold ">Professor at UDSM (COICT)</span>
                <span className="font-semibold">Prof Baraka J. Maiseli</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
