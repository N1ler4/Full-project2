import axios from "axios";
import { getDataFromCookie } from "../utils/tokenService.ts";

const http = axios.create({
    baseURL: "https://app.olimjanov.uz/v1"
});

http.interceptors.request.use((config):any=>{
    let token = getDataFromCookie("token");
    if(token){
        config.headers.Authorization = `${token}`;
    }
    return config
})

async function refreshAccessToken(){
    try{
        const refresh_token = getDataFromCookie("refresh_token");
        if(!refresh_token){
            throw new Error("Refresh token not found")
        }
        const response = await http.post("/auth/refresh-accesstoken/", {refresh_token})
    }
}

export default http