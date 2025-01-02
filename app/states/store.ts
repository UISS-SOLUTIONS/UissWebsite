import { create } from "zustand";
import { IUpdateStore } from "./types";

export const useUpdatesStore = create<IUpdateStore>((set) => ({
  updates: [
    {
      id: 80,
      image:
        "https://img.freepik.com/free-photo/hacker-girl-wearing-black-hoodie-front-computer-with-green-screen-identity-stealing_482257-21840.jpg?t=st=1733640140~exp=1733643740~hmac=66ad76f63613e2889df356afdb2bf5ab9a15737fb636bd12eec92eb1beec8490&w=996",
      title: "Catch The Flag Compitition For Cyber Experts And Pen-Testers",
      date: "8 Dec 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit Id eavoluptatum amet error facere commodi vel similique voluptas, odio repudiandae officiis modi. Corrupti, cupiditate mollitia fuga veritatis accusamus est? Laboriosam architecto corporis sit consequuntur quibusdam alias. Inventore ea, rem placeat officiis, eligendi commodi quisquam incidunt iusto praesentium distinctio voluptate delectus ut porro itaque sed provident odio voluptas culpa earum excepturi nam exercitationem non laboriosam quia! Totam soluta amet optio tenetur.",
    },
    {
      id: 81,
      image:
        "https://img.freepik.com/free-photo/portrait-hacker-with-mask_23-2148165898.jpg?t=st=1733646370~exp=1733649970~hmac=3dfa55a418794ff4749297ecf911751f3671f42d876ed2cbf42cca2a9ed6b1d5&w=826",
      title: "Hackers Quest CTF for Cyber Enthusiasts and Coders",
      date: "5 Dec 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit Id eavoluptatum amet error facere commodi vel similique voluptas, odio repudiandae officiis modi. Corrupti, cupiditate mollitia fuga veritatis accusamus est? Laboriosam architecto corporis sit consequuntur quibusdam alias. Inventore ea, rem placeat officiis, eligendi commodi quisquam incidunt iusto praesentium distinctio voluptate delectus ut porro itaque sed provident odio voluptas culpa earum excepturi nam exercitationem non laboriosam quia! Totam soluta amet optio tenetur.",
    },
    {
      id: 82,
      image:
        "https://img.freepik.com/free-vector/internet-communication-with-community-people_24877-58869.jpg?t=st=1733646497~exp=1733650097~hmac=7bf15c8a72f5942057638108bfa98cb62da22357095260b7e9dcb08d4d28aa2a&w=740",
      title: "Pen-Test Capture Competition for Cybersecurity Minds",
      date: "2 Dec 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit Id eavoluptatum amet error facere commodi vel similique voluptas, odio repudiandae officiis modi. Corrupti, cupiditate mollitia fuga veritatis accusamus est? Laboriosam architecto corporis sit consequuntur quibusdam alias. Inventore ea, rem placeat officiis, eligendi commodi quisquam incidunt iusto praesentium distinctio voluptate delectus ut porro itaque sed provident odio voluptas culpa earum excepturi nam exercitationem non laboriosam quia! Totam soluta amet optio tenetur.",
    },
    {
      id: 83,
      image:
        "https://img.freepik.com/free-photo/ai-cybersecurity-virus-protection-machine-learning_53876-129788.jpg?t=st=1733646731~exp=1733650331~hmac=9f1b9943d9de9bcf5126baa0a8d0d5a020263106ebd233e64b8942fd0194e82a&w=740",
      title: "White Hat CTF Tournament for Cyber and Pen-Test Pros",
      date: "30 Nov 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit Id eavoluptatum amet error facere commodi vel similique voluptas, odio repudiandae officiis modi. Corrupti, cupiditate mollitia fuga veritatis accusamus est? Laboriosam architecto corporis sit consequuntur quibusdam alias. Inventore ea, rem placeat officiis, eligendi commodi quisquam incidunt iusto praesentium distinctio voluptate delectus ut porro itaque sed provident odio voluptas culpa earum excepturi nam exercitationem non laboriosam quia! Totam soluta amet optio tenetur.",
    },
    {
      id: 84,
      image:
        "https://img.freepik.com/free-vector/bar-code-magnifier-realistic-illustration_1284-26570.jpg?t=st=1733646817~exp=1733650417~hmac=f0d73e6e18183c0ab4d5f443bd30201770558ce9576341055d518a933605c87b&w=740",
      title: "Decode the Network Challenge for Hackers and Analysts",
      date: "28 Nov 2024",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit Id eavoluptatum amet error facere commodi vel similique voluptas, odio repudiandae officiis modi. Corrupti, cupiditate mollitia fuga veritatis accusamus est? Laboriosam architecto corporis sit consequuntur quibusdam alias. Inventore ea, rem placeat officiis, eligendi commodi quisquam incidunt iusto praesentium distinctio voluptate delectus ut porro itaque sed provident odio voluptas culpa earum excepturi nam exercitationem non laboriosam quia! Totam soluta amet optio tenetur.",
    },
  ],
  selectedUpdate: {
    id: 80,
    image:
      "https://img.freepik.com/free-photo/hacker-girl-wearing-black-hoodie-front-computer-with-green-screen-identity-stealing_482257-21840.jpg?t=st=1733640140~exp=1733643740~hmac=66ad76f63613e2889df356afdb2bf5ab9a15737fb636bd12eec92eb1beec8490&w=996",
    title: "Catch The Flag Compitition For Cyber Experts And Pen-Testers",
    date: "8 Dec 2024",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit Id eavoluptatum amet error facere commodi vel similique voluptas, odio repudiandae officiis modi. Corrupti, cupiditate mollitia fuga veritatis accusamus est? Laboriosam architecto corporis sit consequuntur quibusdam alias. Inventore ea, rem placeat officiis, eligendi commodi quisquam incidunt iusto praesentium distinctio voluptate delectus ut porro itaque sed provident odio voluptas culpa earum excepturi nam exercitationem non laboriosam quia! Totam soluta amet optio tenetur.",
  },
  setSelectedUpdate: (update) => set({ selectedUpdate: update }),
}));
