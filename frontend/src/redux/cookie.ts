import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { TUser } from "../models/user.model";

const getAuthCookie = () => {
  const cookie = getCookie("token");
  console.log("Cookie yang diambil:", cookie);
  if (!cookie) return undefined;
  return Buffer.from(cookie, "base64").toString("ascii");
};

export const getValidAuthTokens = () => {
  try {
    const token = getAuthCookie();
    const data: TUser = JSON.parse(String(token));

    return {
      data,
    };
  } catch (error) {
    deleteCookie("token");
    return {
      data: undefined,
    };
  }
};

export const setAuthCookie = (token: string) => {
  const toBase64 = Buffer.from(token).toString("base64");

  setCookie("token", toBase64, {
    maxAge: 24 * 60 * 60,
    path: "/dashboard",
    sameSite: "lax",
  });
};
