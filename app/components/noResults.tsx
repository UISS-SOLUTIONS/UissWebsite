import React from "react";

const NoResults = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center text-3xl font-bold gap-3">
      <div className="w-[350px] h-[200px]">
        <img
          src="/notfound.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {message}
    </div>
  );
};

export default NoResults;
