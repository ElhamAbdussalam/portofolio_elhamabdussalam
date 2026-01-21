export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
