
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[]; 
  gallery?: string[];
  details: string[];
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level 0-100
  icon: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  year: string;
  image: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  image: string;
  link: string;
  publisher: string;
  date: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  image: string;
}
