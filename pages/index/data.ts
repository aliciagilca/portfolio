import { Reference, Social, Work } from "./types";

export const work: Work[] = [
  {
    id: 1,
    company: "Versuni",
    title: "Marketing Intern",
    startDate: "2024",
    endDate: "2025",
    description: "I was responsible for the creation of content for the company's social media channels.",
    logo: "/images/versuni-logo.webp",
  },
];

export const references: Reference[] = [
  {
    id: 1,
    company: "Versuni",
    type: "image",
    file: "/images/main.webp",
    link: "https://www.versuni.com",
  },
  {
    id: 2,
    company: "Versuni",
    type: "image",
    file: "/images/main.webp",
    link: "https://www.versuni.com",
  },
  {
    id: 3,
    company: "Versuni",
    type: "image",
    file: "/images/main.webp",
    link: "https://www.versuni.com",
  },
];

export const socials: Social[] = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/alicia-gilca/",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/alice_glc?igsh=Yzd2OTA2ZThjb3Jk",
  },
];
