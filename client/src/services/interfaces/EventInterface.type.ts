export interface HostDto {
  name: string;
  email: string;
  role: string;
  
}

export interface EventsDto {
  id?: number;
  name: string;
  desc: string;
  image: string;
  hostName: string;
  type: string;
  status: string;
  approval: boolean;
  limit: number;
  cal_name: string;
  startingTime: string; // ISO string format
  endingTime: string;   // ISO string format
  addressLink: string;
  userProfileId: number;
  calendarId: number;
  hosts: HostDto[];
  guestIds: number[];
}