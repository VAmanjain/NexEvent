import axios from "axios";
import { checkAuth, logout as logoutAction } from "../../../redux/slices/authSlice";
import store from "../../../redux/store";
import axiosInstance, { setAuthToken } from "../axiosInstance";

const API_URL = 'http://localhost:8091/';



export const login = async (
  email: string | null | undefined,
  password: string | null | undefined
) => {
  return axios
    .post(`${API_URL}auth/login`, { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.removeItem("user");
        localStorage.setItem("user",response.data.token);
        setAuthToken(response.data.token)
        console.log(response.data);
        store.dispatch(checkAuth());
        console.log(store.dispatch(getToken));
        return response.data;
      }
    });
};


export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/users/me');
    console.log(response.statusText)
    if (response.data) {
    console.log(response.data);
    return response.data; // Return the user data
    }
   
  } catch (error) {
    console.error("There was an error fetching the user data:", error);
    logout();
    throw error; // Rethrow the error for further handling
  }
  return null; // Return null in case of error
};

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  let data = {};
  return axios
    .post(`${API_URL}auth/register`, { email, fullName: username, password })
    .then((response) => {
      if (response.data) {
        data = login(email, password);

        console.log("user:", response.data);
      }
      return data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
  store.dispatch(logoutAction());
  console.log(store.getState());
};
export const getToken = (): any => {
  console.log("access Token", store.getState().auth.token);
  return store.getState().auth.token;
};
