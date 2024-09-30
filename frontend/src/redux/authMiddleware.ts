import { Dispatch } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../lib/axios.config";
import { login } from "./slice";
import { TUser } from "../models/user.model";
import { setAuthCookie } from "./cookie";

export const userLogin = ({ username, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance().post("auth/login", {
        username,
        password,
      });

      const { token } = response.data;
      setAuthCookie(token);
      console.log("tokeenn", token);

      const user: TUser = jwtDecode(token);
      dispatch(login(user));
      return { success: true, user };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        deleteCookie("token");
        alert("Wrong Username/Password!");
        return { success: false, message: "Username atau password salah" };
      }
    }
  };
};
export const keepLogin = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getCookie("token");
      if (token) {
        dispatch(login(jwtDecode(token)));
      }
    } catch (err: any) {
      deleteCookie("token");
    }
  };
};
