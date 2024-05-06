import { create } from "zustand";
import http from "../plugins/http";
import { saveDataFromCookie } from "../utils/tokenService";

const useAuthStore = create(() => ({
  signin: async (payload: any) => {
    try {
      const response = await http.post("/auth/login", payload);
      if (response.status === 200) {
        saveDataFromCookie("token", response?.data?.access_token);
        return response
      }
      
    } catch (err) {
      console.error(err);
    }
  },
  register: async (payload: any , email:string) => {
    try {
      const response = await http.post("/auth/register", payload);
      if(response.status === 200) {
        saveDataFromCookie("email" , email)
      }
      return response      
    } catch (err) {
      console.error(err);
    }
  },
  verify: async (payload: any) => {
    try {
      const response = await http.post("/auth/verify", payload);
      return response      
    } catch (err) {
      console.error(err);
    }
  },
  forgotPassword: async (payload: any) => {
    try {
      const response = await http.post("/auth/forgot-password", payload);
      return response      
    } catch (err) {
      console.error(err);
    }
  },
  forgotModalPassword: async (payload: any) => {
    try {
      const response = await http.post("/auth/verify-forgot-password", payload);
      return response      
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useAuthStore;