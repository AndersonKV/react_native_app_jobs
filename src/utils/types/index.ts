export interface JobInterface {
  id: number;
  title: string;
  avatar: string;
  name_company: string;
  id_user: number;
  remote: string;
  techs: Array<String>;
  responsibilities: string;
  requirements: string;
  benefits: string;
  types_contract: string;
  size_company: string;
  experience_level: string;
  expired_days: number;
  created_at: Date;
  salary: string;
  expired: boolean;
  updated_at: Date;
  auth_apply: boolean;
  Job: MatchingsInterface[];
  matchings: MatchingsInterface[];
}

export interface MatchingsInterface {
  id: number;
  id_job: number;
  id_user: number;
  id_author: number;
  updated_at: Date;
  created_at: Date;
  matchings: UserInterface[];
  job_posted: JobInterface;
}

export interface UserInterface {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: string;
  password: string;
  confirm_password: string;
  created_at: Date;
  updated_at: Date;
  matchings: MatchingsInterface[];
  posts: JobInterface[];
  _count: {
    posts: number;
    matchings: number;
  };
}
