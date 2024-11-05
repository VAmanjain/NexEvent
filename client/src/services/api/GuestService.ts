import { Guest } from "../interfaces/Guest.type";
import axiosInstance from "./axiosInstance";

export const CreateGuest = async(guest:Guest) =>{
    const response = await axiosInstance.post("/guests", guest);
    if(response.data){
        console.log(response.data);
        
    }
}


export const getGuestsByEventId = async (eventId: number| string|undefined): Promise<Guest[]> => {
  try {
    const response = await axiosInstance.get(`/guests/event/${eventId}`);
    const guests: Guest[] = response.data;
    return guests;
  } catch (error) {
    console.error('Error fetching guests:', error);
    throw error;
  }
};