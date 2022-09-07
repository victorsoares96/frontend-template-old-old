export type Job = {
  id: number;
  name: string;
  workload: string;
  requirements: string;
  skills: string;
  experience: string;
  quantity: number;
  complement: string;
  createdAt: string;
  createdBy: User;
  candidatures: Candidature[];
  languages: Language[];
};

export type Candidature = {
  id: number;
  appliedAt: string;
  user: User;
  job: Job;
};

export type Language = {
  id: number;
  name: string;
  createdAt: string;
};
