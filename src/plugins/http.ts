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

export default http