export type Project = {
  title: string;
  date: string;
  techStack: string;
  description: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export type Blog = {
  title: string;
  date: string;
  excerpt: string;
  url: string;
};

export type SocialLink = {
  label: string;
  url: string;
};
