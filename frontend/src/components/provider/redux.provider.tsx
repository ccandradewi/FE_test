"use client";
import { Provider } from "react-redux";
import AuthProvider from "./auth.provider";
import { store } from "@/redux/store";

export const StoreProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <AuthProvider> {children} </AuthProvider>
    </Provider>
  );
};
