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
    slug: "versuni-campaign-1",
    company: "Versuni",
    type: "image",
    file: "/images/main.webp",
    link: "https://www.versuni.com",
    items: [
      { type: "image", file: "/images/main.webp", caption: "Campaign hero visual" },
      { type: "image", file: "/images/main.webp", caption: "Social media content" },
      { type: "image", file: "/images/main.webp", caption: "Brand activation" },
    ],
  },
  {
    id: 2,
    slug: "versuni-campaign-2",
    company: "Versuni",
    type: "image",
    file: "/images/main.webp",
    link: "https://www.versuni.com",
    items: [
      { type: "image", file: "/images/main.webp", caption: "Product launch" },
      { type: "image", file: "/images/main.webp", caption: "Event coverage" },
    ],
  },
  {
    id: 3,
    slug: "versuni-campaign-3",
    company: "Versuni",
    type: "image",
    file: "/images/main.webp",
    link: "https://www.versuni.com",
    items: [
      { type: "image", file: "/images/main.webp", caption: "Content series" },
      { type: "image", file: "/images/main.webp", caption: "Behind the scenes" },
      { type: "image", file: "/images/main.webp", caption: "Final deliverable" },
    ],
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
  {
    name: "Substack",
  },
  {
    name: "Letterboxd",
  },
];
