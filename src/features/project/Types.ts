export interface AddProjectInput {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  goalAmount: number;
  fundRaised: number;
  aboutTheCause: string;
  planOfAction: string;
  flyer?: string;
}

export interface ProjectWithID {
  id: number;
}
