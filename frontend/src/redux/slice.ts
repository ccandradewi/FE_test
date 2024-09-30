import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "cookies-next";
import { initialUser } from "./initial";
import { TUser } from "../models/user.model";

export const userSlice = createSlice({
  name: "auth",
  initialState: initialUser as TUser | null,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      const token = getCookie("token");
      console.log("Token sebelum dihapus:", token);
      deleteCookie("token", { path: "/dashboard" });
      return initialUser;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
