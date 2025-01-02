import React from "react";
import MemberCard from "./memberCard";
import { IMemberCard } from "../../types";
import { Selector } from "@/app/components/Selector";
import { SelectProps } from "@/app/components/types";

const Governance = () => {
  const members: IMemberCard[] = [
    {
      id: 50,
      name: "Moody A Mshana",
      image:
        "https://media.istockphoto.com/id/2032134525/photo/portrait-manager-and-mature-black-man-at-restaurant-chain-with-smile-confidence-and-small.jpg?s=612x612&w=0&k=20&c=vTxQGr7aWVs4U7AR-fgSfofo6ffuF353HzfH20343Xo=",
      position: "Technical Lead",
      socials: {
        instagram: "https://www.instagram.com/he.ismoody/",
        facebook: "https://www.facebook.com/moody.amin.564",
        linkedin: "https://www.linkedin.com/in/moody-mshana",
        twitter: "https://x.com/Heismoody",
      },
    },
    {
      id: 51,
      name: "Emmanuel Nziku",
      image:
        "https://media.istockphoto.com/id/1394375495/photo/young-african-businessman-sitting-in-an-office-at-work.jpg?s=612x612&w=0&k=20&c=FzbEKSKL2Wr4NJfxMViw_SrBGQGaz2ICjhB6i2Yubos=",
      position: "Designing Lead",
      socials: {
        instagram: "https://www.instagram.com/he.ismoody/",
        facebook: "https://www.facebook.com/moody.amin.564",
        linkedin: "https://www.linkedin.com/in/moody-mshana",
        twitter: "https://x.com/Heismoody",
      },
    },
    {
      id: 52,
      name: "Thecla John",
      image:
        "https://media.istockphoto.com/id/1587604086/photo/lawyer-portrait-and-black-woman-with-tablet-in-office-for-research-email-and-smile-african.jpg?s=612x612&w=0&k=20&c=Di__5HxM-qLbGjfNAqy-AQvI5ls71gQoAzJoYilXKAc=",
      position: "President",
      socials: {
        instagram: "https://www.instagram.com/he.ismoody/",
        facebook: "https://www.facebook.com/moody.amin.564",
        linkedin: "https://www.linkedin.com/in/moody-mshana",
        twitter: "https://x.com/Heismoody",
      },
    },
  ];

  const selectOptions: SelectProps[] = [
    {
      id: 20,
      placeholder: "Year",
      options: [
        { name: "2020" },
        { name: "2021" },
        { name: "2022" },
        { name: "2023" },
        { name: "2024" },
      ],
    },
  ];

  const positionOptions: SelectProps[] = [
    {
      id: 20,
      placeholder: "Position",
      options: [
        { name: "President" },
        { name: "Vice President" },
        { name: "General Secretary" },
        { name: "Technical Department" },
        { name: "Social Department" },
      ],
    },
  ];
  return (
    <section className="flex justify-center pt-[11vh]" id="ExploreGovernance">
      <div className="w-[1161px]">
        <div className="flex justify-between">
          <span className="text-5xl font-bold border-b-2 pb-2 border-primary/20">
            Governance / Team
          </span>
          <div className="flex gap-2">
            {positionOptions.map((positionOption) => (
              <Selector select={positionOption} key={positionOption.id} classname="w-[280px] bg-red-900"/>
            ))}
            {selectOptions.map((selectOption) => (
              <Selector select={selectOption} key={selectOption.id} />
            ))}
          </div>
        </div>
        <div className="flex justify-between pt-16 pb-10">
          {members.map((member) => (
            <MemberCard member={member} key={member.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Governance;
