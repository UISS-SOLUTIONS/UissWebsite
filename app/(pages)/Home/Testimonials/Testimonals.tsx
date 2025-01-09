import AutoSlider from "@/app/components/AutoSlider";
import TestmonyCard from "./TestmonyCard";
import { ITestmonyCard } from "../../types";

const Testimonials = () => {
  const testimonals: ITestmonyCard[] = [
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1590735627513-59a186ed0984?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWQlMjBvZiUyMGRlcGFydG1lbnR8ZW58MHx8MHx8fDA%3D",
      name: "Prof Baraka J. Maiseli",
      position: "Professor at UDSM (COICT)",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae ducimus provident cupiditate fugiat modi animi obcaecati cum,illo totam praesentium, labore eum ab explicabo laborum exercitationem.Quam deleniti architecto ducimus cumque quod!",
    },
    {
      id: 8,
      image:
        "https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg?ga=GA1.1.1230501742.1731132474&semt=ais_hybrid",
      name: "Mr Moody A. Mshana",
      position: "Technical Website Lead UISS",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae ducimus provident cupiditate fugiat modi animi obcaecati cum,illo totam praesentium, labore eum ab explicabo laborum exercitationem.Quam deleniti architecto ducimus cumque quod!",
    },
    {
      id: 9,
      image:
        "https://img.freepik.com/free-photo/african-american-woman-hat_1303-10891.jpg?ga=GA1.1.1230501742.1731132474&semt=ais_hybrid",
      name: "Miss Teckla J",
      position: "President UISS",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae ducimus provident cupiditate fugiat modi animi obcaecati cum,illo totam praesentium, labore eum ab explicabo laborum exercitationem.Quam deleniti architecto ducimus cumque quod!",
    },
    {
      id: 10,
      image:
        "https://img.freepik.com/free-photo/portrait-handsome-looking-man_23-2148448867.jpg?ga=GA1.1.1230501742.1731132474&semt=ais_hybrid",
      name: "Emmanuel Nziku",
      position: "Excom Academics DARUSO",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ea nulla veniam dolorum doloremque magni nesciunt et ad debitis. Soluta recusandae ducimus provident cupiditate fugiat modi animi obcaecati cum,illo totam praesentium, labore eum ab explicabo laborum exercitationem.Quam deleniti architecto ducimus cumque quod!",
    },
  ];
  return (
    <div className="bg-black flex justify-center items-center py-20 text-black">
      <div className="w-full md:w-[1161px]">
        <span className=" flex justify-center md:justify-start text-4xl cursor-pointer font-semibold border-b-[1px] border-white/30  pb-4 mb-4 text-white">
          Testimonials
        </span>
        <div className="w-full mt-10 flex justify-center">
          <div className="w-full md:w-[80%] rounded-lg bg-white">
            <AutoSlider>
              {testimonals.map((testmony, index) => {
                return (
                  <TestmonyCard
                    slideNo={index + 1}
                    testmonyCard={testmony}
                    key={testmony.id}
                  />
                );
              })}
            </AutoSlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
