import { axiosInstance } from "./axios";

export const signUp = async (signUpData)=> {
    const response = await axiosInstance.post('/auth/signup' , signUpData)
    return response.data;
}

export const signIn = async (signInData)=> {
    const response = await axiosInstance.post('/auth/login' , signInData)
    return response.data;
}

export const logOut = async ()=> {
    const response = await axiosInstance.post('/auth/logout')
    return response.data;
}

export const authUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data;
    } catch (error) {
        console.log("error in authUser", error);
        return null
    }
}

export const completeOnboarding = async(userData)=>{
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data
}