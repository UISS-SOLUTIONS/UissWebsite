import CallToAction from "@/app/components/CallToAction";
import CustomForm from "@/app/components/CustomForm";
import React from "react";

const LandPage = ({title, description}:{title:string, description:string}) => {
  return (
    <section className="flex flex-col justify-center items-center relative h-[100vh] -mt-[10vh]">
      <div className="w-full h-full absolute">
        <img
          src="https://img.freepik.com/free-photo/programer-sitting-desk-with-multiple-screens-running-code-talking-with-colleague-about-artificial-intelligence-algorithm-software-developers-doing-innovative-artificial-intelligence-project_482257-40606.jpg?t=st=1732703708~exp=1732707308~hmac=a98b0188c6ee985047e885f628903429d856a770d4d684e21ec9407ef54b8bda&w=996"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full bg-black/85" />
      <div className="w-[1400px] flex justify-between mt-20 z-50">
        <div className="text-white w-[90%] flex flex-col p-10">
          <span className="text-4xl font-bold">
            UNIVERSITY OF DAR ES SALAAM ICT STUDENTS&apos; SOCIETY
          </span>
          <span className="flex py-5 text-4xl font-bold text-ternary">
            {title}
          </span>
          <p className="text-xl  opacity-60 w-[80%]">
            {description}
          </p>

          <CallToAction
          className="text-xl px-8 py-2 bg-[#efb631] text-black font-bold rounded-lg w-fit mt-3"
          name="Join Club"
        >
          <CustomForm />
        </CallToAction>
        </div>
      </div>
    </section>
  );
};

export default LandPage;
