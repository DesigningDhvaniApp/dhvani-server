export interface AddEventInput {
  eventName: string;
  eventType: string;
  eventDescription: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventOrganisers: string;
  eventCost: number;
  eventVenue: string;
  maxPlayers: number;
  flyer?: string;
}

export interface EventWithID {
  id: number;
}

export interface EventWithIdAndName {
  id: number;
  name: string;
}

export interface GetEventDetails {
  id: number;
  eventName: string;
  eventType: string;
  eventDescription: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventOrganisers: string;
  eventCost: number;
  eventVenue: string;
  maxPlayers: number;
  flyer?: string;
  status: string;
}

export interface UpdateEventInput {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  flyer?: string;
}
