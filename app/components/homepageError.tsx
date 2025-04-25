import React from "react";

const HomepageError = ({message}:{message: string}) => {
  return (
    <>
      <div className="bg-red-900 h-full w-full relative">
        <div className="absolute w-full h-[100vh] top-0 bg-black/75" />
        <img
          src="https://img.freepik.com/free-photo/still-life-space-arrangement-with-astronaut_23-2149101752.jpg?t=st=1744902076~exp=1744905676~hmac=fd0ebe8d95b2120fa2fd1a2cc39f7538a793e5c85174e466ff38a3abcf26f30e&w=826"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[90%] md:w-fit">
          <h1 className="text-4xl font-bold md:text-8xl ">
            <span className="flex justify-center text-[#efb631]">404</span>
          </h1>
          <p className="text-center text-3xl opacity-80 py-8 font-bold flex items-center gap-3">
            <img
              src="./plug.png"
              alt=""
              className="h-[64px] w-[64px] object-cover hidden md:block"
            />
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomepageError;
