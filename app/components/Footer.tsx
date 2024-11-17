import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-black">
      <div className="container flex justify-between py-10 border-b-2 border-white/10">
        <div className="flex flex-col w-[450px]">
          <div className="w-[250px] h-[70px]">
            <img
              src="./UISS_LOGO.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
          <p className="py-5 opacity-60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            assumenda obcaecati voluptatem veritatis odio vero. Consequuntur
            quae molestias dolorum non!
          </p>
          <div className="flex items-center gap-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="stroke-white fill-white/60 w-[25px] h-[25px] hover:fill-[#efb631]"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="stroke-white fill-white/60 w-[25px] h-[25px] hover:fill-[#efb631]"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="stroke-white fill-white/60 w-[25px] h-[25px] hover:fill-[#efb631]"
            >
              <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="stroke-white fill-white/60 w-[25px] h-[25px] hover:fill-[#efb631]"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-white">
          <span className="flex font-bold text-xl"> PROGRAMMES</span>
          <ul className="py-4">
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              Software Development Club
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              Networking Club
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              CyberSecurity Club
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              Artificial Intelligence Club
            </li>
          </ul>
        </div>
        <div className="flex flex-col text-white">
          <span className="flex font-bold text-xl"> QUICK LINKS</span>
          <ul className="py-4">
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              About
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              Podcast
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              Events
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer">
              Support Us
            </li>
          </ul>
        </div>
        <div className="flex flex-col text-white">
          <span className="flex font-bold text-xl"> CONTACT US</span>
          <ul className="py-4">
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <span>uiss@udsm.ac.tz</span>
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer flex gap-2 items-center py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              <span>+255 754 xxx xxx</span>
            </li>
            <li className="hover:text-[#efb631] text-white/60 cursor-pointer flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span>CoICT Sayansi - Kijitonyama</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="container flex justify-end">
          <span className="text-white/50 flex py-8">@ {new Date().getFullYear()} UISS Software Development Club</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
