import CallToAction from "@/app/components/CallToAction";
import React from "react";

const JoinUs = () => {
  return (
    <section className="w-full h-[100vh] relative flex items-center justify-center -mt-[10vh]">
      <div className="w-full h-full absolute">
        <img
          src="https://img.freepik.com/free-photo/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-education-theme_627829-5991.jpg?t=st=1733726682~exp=1733730282~hmac=ee42c3a02af9047b8fb80c664da92172d0beb9b745f0a2252a9106d3b7571e5c&w=826"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-black/80 absolute top-0 w-full h-full"/>
      <div className="z-10 flex flex-col items-center gap-5">
        <span className="text-5xl font-bold text-secondary text-center">Join the UISS Community: <span className="text-ternary block mt-3">Empowering Ambitions, Inspiring Success</span></span>
        <p className="w-[60%] text-secondary text-xl text-center">Ready to grow, connect, and make an impact? UISS is where ambitious students unite to innovate, learn, and collaborate. Join a vibrant community that empowers you to develop skills, expand networks, and shape the future. Start your journey with UISS today!</p>
        <CallToAction
            className="text-xl px-8 py-2 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-3"
            name="Sign Up"
          />
      </div>
    </section>
  );
};

export default JoinUs;
