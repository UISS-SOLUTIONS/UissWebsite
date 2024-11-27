import Link from "next/link";
import React from "react";

const LandPage = () => {
  return (
    <section className="flex flex-col justify-center items-center relative h-[100vh]">
      <div className="w-full h-full absolute">
        <img
          src="https://img.freepik.com/free-photo/programer-sitting-desk-with-multiple-screens-running-code-talking-with-colleague-about-artificial-intelligence-algorithm-software-developers-doing-innovative-artificial-intelligence-project_482257-40606.jpg?t=st=1732703708~exp=1732707308~hmac=a98b0188c6ee985047e885f628903429d856a770d4d684e21ec9407ef54b8bda&w=996"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full bg-black/85" />
      <div className="w-[1400px] flex justify-between mt-20 z-10">
        <div className="text-white w-[90%] flex flex-col p-10">
          <span className="text-4xl font-bold">
            UNIVERSITY OF DAR ES SALAAM ICT STUDENTS&apos; SOCIETY
          </span>
          <span className="flex py-5 text-4xl font-bold text-ternary">
            Software Development Club
          </span>
          <p className="text-xl  opacity-60 w-[80%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            sapiente optio placeat delectus provident dignissimos, illum quae!
            Ducimus, eveniet veniam. Asperiores exercitationem porro consequatur
            itaque quas nam fugiat vero molestiae impedit sed in excepturi quod
            tempore, adipisci reiciendis veritatis error eligendi
          </p>
          <Link
            href={"#"}
            className="px-6 mt-8 py-1.5 bg-ternary w-fit rounded-full font-extrabold text-primary text-xl"
          >
            Join Club
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandPage;
