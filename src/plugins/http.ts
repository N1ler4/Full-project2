import axios from "axios";
import {
  getDataFromCookie,
  saveDataFromCookie,
} from "../utils/tokenService.ts";

const http = axios.create({
  baseURL: "https://app.olimjanov.uz/v1",
});

http.interceptors.request.use((config): any => {
  let token = getDataFromCookie("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

async function refreshAccessToken() {
  try {
    const refresh_token = getDataFromCookie("refresh_token");
    if (!refresh_token) {
      throw new Error("Refresh token not found");
    }
    const response = await axios.post(
      `https://app.olimjanov.uz/v1/auth/refresh-accesstoken/${refresh_token}`
    );
    const { access_token } = response.data;
    saveDataFromCookie("token", access_token);
    return access_token;
  } catch (err) {
    console.log(err);
  }
}
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
      } else {
        console.error("Failed to refresh access token");
        return Promise.reject(error);
      }
    }
  }
);

export default http;
