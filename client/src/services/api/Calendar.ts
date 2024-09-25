import axiosInstance from "./axiosInstance"

export const createCalendar = async(cal_name: string, username: string | undefined, userProfileId:number | undefined ) =>{
    try {
        if(cal_name === undefined || username == undefined || userProfileId == undefined){
            return {error :"form empty error"}
        }
    const response = await axiosInstance.post('/calendar', {
        cal_name,
        ownerName:username,
        userProfileId
    });
     if (response.data) {
    console.log(response.data);
    return response.data; // Return the user data
    }
  } catch (error) {
    console.error("There was an error creating the calendar:", error);
    throw error; // Rethrow the error for further handling
  }

  return null;

}