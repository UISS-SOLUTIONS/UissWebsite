import StatCounter from "@/app/components/Counter";
import { StatCounterProps } from "@/app/components/types";
import React from "react";

const WelcomeNote = () => {
  const stats: StatCounterProps[] = [
    {
      id: 40,
      start: 0,
      end: 6,
      label: "Clubs",
      duration: 0.5,
    },
    {
      id: 42,
      start: 0,
      end: 15,
      label: "Leads",
      duration: 1,
    },
    {
      id: 43,
      start: 0,
      end: 128,
      label: "Students",
      duration: 1,
    },
    {
      id: 44,
      start: 0,
      end: 7,
      label: "Collages",
      duration: 0.5,
    },
  ];
  return (
    <section className="flex flex-col justify-center items-center relative h-[100vh] -mt-[10vh]">
      <div className="w-full h-full absolute">
        <img
          src="./welcomeBg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute w-full h-full bg-black/85" />
      <div className="w-[1400px] flex flex-col md:flex-row items-center justify-between mt-[100px] z-10">
        <div className="text-white w-[60%] flex flex-col p-10">
          <span className="text-4xl font-bold">
            UNIVERSITY OF DAR ES SALAAM ICT STUDENTS&apos; SOCIETY
          </span>
          <span className="flex py-5 text-4xl font-bold text-ternary">
            WELCOME NOTE
          </span>
          <p className="text-lg text-justify opacity-60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            sapiente optio placeat delectus provident dignissimos, illum quae!
            Ducimus, eveniet veniam. Asperiores exercitationem porro consequatur
            itaque quas nam fugiat vero molestiae impedit sed in excepturi quod
            tempore, adipisci reiciendis veritatis error eligendi voluptatum
            voluptas ipsa. Iusto commodi iste odio repudiandae atque facere,
            aperiam ipsa et soluta, nisi sapiente voluptates enim vero saepe
            dicta illo perferendis sequi quas quos. Consequuntur qui molestias
            odit sunt minus blanditiis, quo vitae natus animi soluta numquam
            commodi inventore quos corrupti dignissimos est nobis corporis
            tempora ut. Iste unde, autem rerum voluptatibus maiores quos soluta
            voluptatem nam!quo vitae natus animi soluta numquam commodi
            inventore quos corrupti dignissimos est nobis corporis tempora ut.
          </p>
        </div>
        <div className="w-[40%] flex items-center">
          <div className="w-[50%] h-full flex justify-center items-center">
            <div className="rounded-full overflow-hidden h-[250px] w-[250px] border-[3px] border-secondary">
              <img
                src="https://plus.unsplash.com/premium_photo-1663040111191-c585a609fd9c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhJTIwcHJvZmVzc29yfGVufDB8fDB8fHww"
                alt=""
                className="h-full w-full object-cover transition-transform duration-300"
              />
            </div>
          </div>
          <div className="w-[50%] h-full flex flex-col justify-center gap-10 items-start ">
            <div className="w-[150px] h-[150px] overflow-hidden rounded-full border-[3px] border-secondary">
              <img
                src="https://images.unsplash.com/photo-1561406636-b80293969660?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJsYWNrJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-[200px] h-[200px] overflow-hidden rounded-full border-[3px] border-secondary">
              <img
                src="https://images.unsplash.com/photo-1589403285392-5672147c4a69?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGJsYWNrJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around w-[1161px] z-10">
        {stats.map((stat) => (
          <StatCounter stat={stat} key={stat.id} />
        ))}
      </div>
    </section>
  );
};

export default WelcomeNote;
