export type Work = {
  id: number;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  url?: string;
};

export type ReferenceItem = {
  type: "image" | "video";
  file: string;
  caption?: string;
};

export type Reference = {
  id: number;
  slug: string;
  company: string;
  type: "image" | "video";
  file: string;
  link: string;
  items: ReferenceItem[];
};

export type Social = {
  name: string;
  link?: string;
};

export type Recommendation = {
  id: number;
  slug: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  highlight: string;
  fullText: string;
};
