"use client";
import { useAppDispatch } from "@/app/hook";
import { keepLogin } from "@/redux/authMiddleware";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const fetchUser = async () => await dispatch(keepLogin());

  useEffect(() => {
    fetchUser();
  }, []);

  return children;
}
