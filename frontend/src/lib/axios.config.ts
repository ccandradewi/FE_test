import axios from "axios";
import { getCookie } from "cookies-next";

const baseURL = "http://localhost:8080/api";

export function axiosInstance() {
  const token = getCookie("access_token") || "";

  return axios.create({
    baseURL,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
