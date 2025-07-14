import { axiosInstance } from "./axios";

export const signUp = async (signUpData)=> {
    const response = await axiosInstance.post('/auth/signup' , signUpData)
    return response.data;
}

export const authUser = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
}