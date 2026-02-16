import { Reference, Recommendation, Social, Work } from "./types";

export const work: Work[] = [
  {
    id: 1,
    company: "Storyteq",
    title: "Project Manager",
    startDate: "2025",
    endDate: "2026",
    description: "I was responsible for project management.",
    logo: "/images/storyteq-logo.png",
    url: "https://www.storyteq.com",
  },
  {
    id: 2,
    company: "Versuni",
    title: "Marketing Intern",
    startDate: "2024",
    endDate: "2025",
    description: "I was responsible for the creation of content for the company's social media channels.",
    logo: "/images/versuni-logo.webp",
    url: "https://www.versuni.com",
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
    name: "Letterboxd",
  },
];

export const recommendations: Recommendation[] = [
  {
    id: 1,
    slug: "maria-johnson",
    name: "Maria Johnson",
    role: "Marketing Director",
    company: "Versuni",
    avatar: "/images/placeholder-avatar.svg",
    highlight: "Alicia brought an incredible creative energy to every project she touched. Her ability to translate brand vision into compelling content is truly remarkable.",
    fullText: "Alicia brought an incredible creative energy to every project she touched. Her ability to translate brand vision into compelling content is truly remarkable. During her time at Versuni, she consistently delivered work that exceeded expectations. She has a rare combination of creative intuition and strategic thinking that makes her an invaluable team member. I would highly recommend her to anyone looking for a producer who can elevate their brand's storytelling.",
  },
  {
    id: 2,
    slug: "james-de-vries",
    name: "James de Vries",
    role: "Creative Lead",
    company: "Versuni",
    avatar: "/images/placeholder-avatar.svg",
    highlight: "Working with Alicia was a breath of fresh air. She has an eye for detail and a deep understanding of what makes content resonate with audiences.",
    fullText: "Working with Alicia was a breath of fresh air. She has an eye for detail and a deep understanding of what makes content resonate with audiences. From conceptualization to final delivery, she managed every aspect of production with professionalism and creativity. Her collaborative spirit made her a joy to work with, and the results speak for themselves. She is the kind of producer who elevates everyone around her.",
  },
  {
    id: 3,
    slug: "sophie-muller",
    name: "Sophie Muller",
    role: "Brand Manager",
    company: "Versuni",
    avatar: "/images/placeholder-avatar.svg",
    highlight: "Alicia has a unique talent for turning complex briefs into beautiful, cohesive campaigns. Her work ethic and passion for storytelling are unmatched.",
    fullText: "Alicia has a unique talent for turning complex briefs into beautiful, cohesive campaigns. Her work ethic and passion for storytelling are unmatched. She took ownership of projects from day one and consistently delivered on time and above expectations. Her understanding of both the creative and strategic sides of marketing made her an essential part of our team. I cannot recommend her highly enough for any production or content role.",
  },
];
