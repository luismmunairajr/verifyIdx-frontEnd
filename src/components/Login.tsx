"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/assets/logo.svg";

export default function Login() {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col space-y-5">
        <Image src={logo} alt="logo" className="w-40"/>
      <button onClick={() => signIn("keycloak")} className="bg-blue-600 hover:bg-blue-500 h-10 w-40 rounded-md text-white">
        Signin
      </button>
    </div>
  );
}
