import React from "react";

const ItStartsWithYou = () => {
  return (
    <div className="bg-black flex justify-center items-center">
      <div className="w-[1161px] flex justify-between items-center gap-5 my-20">
        <div className="w-[50%]">
          <span className="flex text-5xl py-4 font-semibold w-fit border-b border-white/15 cursor-pointer">
            It Starts With You
          </span>
          <p className="text-lg text-justify mt-6 text-white/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            necessitatibus velit possimus consequatur autem amet accusantium
            libero dolores, dolore dicta! Sint ipsam tenetur maiores quo, minus
            quod unde id ut aliquam expedita esse culpa architecto amet!
            Nesciunt voluptates quas in animi magni!
          </p>
        </div>
        <div className="w-[45%] h-[40vh]">
          <img
            src="https://media.istockphoto.com/id/1334063560/photo/african-americans-college-students-e-leaning-with-their-teacher-during-a-class.jpg?s=612x612&w=0&k=20&c=6ADofCPEBlGPK1MFGM44sfdCe9sjMzzzzK0MkZTcLw8="
            alt="black"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ItStartsWithYou;
