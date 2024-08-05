export interface AddProjectInput {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  goalAmount: number;
  fundRaised: number;
  aboutTheCause: string;
  planOfAction: string;
  file?: string;
}

export interface ProjectWithID {
  id: number;
}
