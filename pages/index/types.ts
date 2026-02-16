export type Work = {
  id: number;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
};

export type Reference = {
  id: number;
  company: string;
  type: "image" | "video";
  file: string;
  link: string;
};

export type Social = {
  name: string;
  link?: string;
};
