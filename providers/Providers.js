"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
export default AuthProvider;
