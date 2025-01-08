import React from "react";

const Sponsors = () => {
  return (
    <div className="flex justify-center items-center py-10 bg-white">
      <div className="w-[1161px]">
        <div>
          <p className="text-4xl font-bold text-center pb-2 text-black">Our Supporters</p>
          <p className="uppercase text-[#efb631] text-base font-bold text-center">
            Sponsors & Partners
          </p>
        </div>
        <div className="grid grid-cols-2 space-y-5 px-5 md:flex justify-between items-center py-10">
          <div className="w-[150px] h-[150px]">
            <img src="/Sponsors/brand-shield.svg" alt="Binary Labs" className="w-full h-full"/>
          </div>
          <div>
            <img src="/Sponsors/images.png" alt="IEEE" className="w-full h-full "/>
          </div>
          <svg
            width="80"
            height="80"
            viewBox="0 0 55 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.1782 26.9109C54.1782 41.8812 42.0594 54 27.0891 54C12.1188 54 0 41.8812 0 26.9109C0 11.9406 12.297 0 27.0891 0C41.8812 0 54.1782 11.9406 54.1782 26.9109Z"
              fill="#D7171A"
            ></path>
            <path
              d="M27.4454 42.0592C19.9602 42.0592 12.2969 35.8216 12.2969 25.485C12.2969 18.7127 15.8612 12.2968 20.4949 8.37605C24.9503 4.63348 31.188 2.13843 36.8909 2.13843C37.6038 2.13843 38.3167 2.13843 38.8513 2.31665C33.8612 3.38595 29.9404 7.8414 30.1187 13.1879C30.1187 13.3662 30.1187 13.5444 30.1187 13.5444C38.3167 15.5048 42.0593 20.4949 42.0593 27.4454C41.881 34.3959 36.5345 42.0592 27.4454 42.0592Z"
              fill="white"
            ></path>
          </svg>
          <div>
            <img src="/Sponsors/logai.png" alt="logai" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
