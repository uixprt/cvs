// CV Data Types
export interface PersonalInfo {
  name: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
  };
}

export interface Role {
  title: string;
  duration: string;
  responsibilities: string[];
}

export interface Experience {
  company: string;
  location: string;
  totalTenure?: string;
  roles: Role[];
}

export interface Skills {
  [category: string]: string[];
}

export interface CVData {
  profile: string;
  personalInfo: PersonalInfo;
  headline: string;
  summary: string;
  skills: Skills;
  experience: Experience[];
}
