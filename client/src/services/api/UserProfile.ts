import { UserProfileInfo1 } from "../interfaces/UserProfileInfo.type";
import axiosInstance from "./axiosInstance"

export const getUserProfile = async(id: number | string | undefined ) =>{

    try {
        const response = await axiosInstance.get(`/profile/${id}`);
    if(response.data){
        console.log("UserProfile: "+response.data);
        return response.data
    }
    } catch (error) {
        console.log(error)
    }
    

}

export const updateUserProfile = async (id: string, userProfileData: UserProfileInfo1) => {
    try {
      const response = await axiosInstance.post(`/profile/${id}`, userProfileData);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };