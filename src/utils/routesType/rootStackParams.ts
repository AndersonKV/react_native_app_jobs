import { JobInterface, UserInterface } from '../types';

export type RootStackParamHome = {
  LoginUser: undefined;
  LoginCompany: undefined;
};

export type RootStackParamSignIn = {
  LoginUser: undefined;
  RegisterUser: undefined;
  LoginCompany: undefined;
  RegisterCompany: undefined;
  AuthTabStack: {
    screen: 'ListJobs';
    values?: UserInterface;
  };
};

export type RootStackParamList = {
  AuthStack: {
    values: JobInterface;
    screen: 'JobDetail';
    token: string;
  };
  AuthTabStack: {
    screen: 'ListJobs';
  };
};

export type RootStackParamJobDetail = {
  Matching: {
    values: {
      token: string;
      id_job: number;
    };
  };
  AuthStack: {
    screen: 'Error';
  };
};

export type RootStackParamApply = {
  JobDetail: undefined;
  Apply: undefined;
  AuthStack: {
    screen: 'Error';
  };
  values: {
    token: string;
    id_job: number;
  };
};

export type RootStackParamSignOut = {
  HomeStack: {
    screen: 'Home';
  };
};

export type RootStackParamError = {
  AuthTabStack: {
    screen: 'ListJobs';
  };
};

export type RootStackParamModal = {
  AuthTabStack: {
    screen: 'Dashboard' | 'ListJobs';
    values?: UserInterface;
  };
  AuthStack: {
    screen: 'LoginOut' | 'Edit';
    values?: UserInterface;
  };
};

export type RootStackParamOpportunity = {
  Apply: {
    values: {
      token: string;
      id_job: number;
    };
  };
  AuthStack: {
    screen: 'Error' | 'JobDetail';
    values?: JobInterface;
    token?: string;
  };
};

export type RootStackParamPublish = {
  AuthStack: {
    screen: 'Error' | 'JobDetail' | 'Publish';
    values?: JobInterface;
    token?: string;
  };
};
export type RootStackParamEdit = {
  AuthStack: {
    screen: 'Opportunity' | 'Edit' | 'Error';
    values?: UserInterface;
  };
};

export type RootStackParamDashboard = {
  Apply: {
    values: {
      token: string;
      id_job: number;
    };
  };
  AuthStack: {
    screen: 'Opportunity' | 'Edit' | 'Error';
    values?: UserInterface;
  };
};

export type RootStackParamJobList = {
  AuthStack: {
    screen: 'LoginOut' | 'Error' | 'JobDetail';
    values?: JobInterface;
    token?: string;
  };
};
