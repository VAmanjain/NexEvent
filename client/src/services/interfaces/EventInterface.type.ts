export interface HostDto {
  id?:number;
  name: string;
  email: string; // Assuming you want to include email for hosts
  role?: string; // Optional field for host role
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