import axios from "axios";
import { EventsDto, HostDto } from "../interfaces/EventInterface.type";
import { User } from "../interfaces/User.type";
import { getUser } from "./auth/AuthService";
import axiosInstance from "./axiosInstance";
import { getUserProfile } from "./UserProfile";
import { UserProfileInfo1 } from "../interfaces/UserProfileInfo.type";

export const createEvent = async (eventData: EventsDto): Promise<any> => {
    try {
      const user: User = await getUser();
          console.log(user);
        const userProfile:UserProfileInfo1 = await getUserProfile(user.id);
        eventData.userProfileId = userProfile?.id;
          const host: HostDto = {
            name: user.fullName, // Assuming user has a fullName property
            email: user.email, // Assuming user has an email property
            role: "Host", // Assign a default role or modify as needed
          };

          eventData.hosts.push(host);
          
          console.log("Event Dto :", eventData);

        const response = await axiosInstance.post('/event', eventData); // Send the eventData directly

        if (response.status === 201) {
            console.log('Event created successfully:', response.data);
            return response.data; // Return the created event or any other relevant data
        } else {
            console.error('Failed to create event:', response.status);
            throw new Error('Failed to create event');
        }
    } catch (error) {
        console.error('Error creating event:', error);
        throw error; // Rethrow the error for further handling
    }
};


export const getActiveEvents = async (): Promise<EventsDto[]> => {
    const response = await axiosInstance.get('/event/active');
    console.log(response);
     // Adjust base URL as needed
    return response.data; // Assuming response.data contains an array of EventsDto
};


export const getUpcomingEventsForUser = async (userId: number): Promise<EventsDto[]> => {
    const response = await axiosInstance.get(`event/user/upcoming?userId=${userId}`);
    console.log(response.data);
    return response.data; // Assuming response.data contains an array of EventsDto
};

export const getPastEventsForUser = async (userId: number): Promise<EventsDto[]> => {
    const response = await axiosInstance.get(`event/user/past?userId=${userId}`);
    console.log(response.data);
    return response.data; // Assuming response.data contains an array of EventsDto
};


export const getEvent = async (id: string | undefined): Promise<EventsDto | null> => {
    if (!id) {
        console.error('Event ID is undefined');
        return null; // Return null if ID is not provided
    }

    try {
        const response = await axiosInstance.get(`/event/${id}`);
        if (response.status === 200) {
            console.log('Event fetched successfully:', response.data);
            return response.data; // Return the fetched event data
        } else {
            console.error('Failed to fetch event:', response.status);
            throw new Error('Failed to fetch event');
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error; // Re-throw the error for further handling
    }
};



export const getEventByProfile = async (id: string | undefined): Promise<EventsDto | null> => {
    if (!id) {
        console.error('Event ID is undefined');
        return null; // Return null if ID is not provided
    }

    try {
        const response = await axiosInstance.get(`/event/user/${id}`);
        if (response.status === 200) {
            console.log('Event fetched successfully:', response.data);
            return response.data; // Return the fetched event data
        } else {
            console.error('Failed to fetch event:', response.status);
            throw new Error('Failed to fetch event');
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error; // Re-throw the error for further handling
    }
};


export const getAllEvents = async (): Promise<EventsDto | null> => {
    

    try {
        const response = await axiosInstance.get(`/event/all`);
        if (response.status === 200) {
            console.log('Event fetched successfully:', response.data);
            return response.data; // Return the fetched event data
        } else {
            console.error('Failed to fetch event:', response.status);
            throw new Error('Failed to fetch event');
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error; // Re-throw the error for further handling
    }
};



