"use client"
import { signOut } from "next-auth/react";
import federatedLogout from "@/lib/federatedLogout";


export default function Logout() {
  return <button onClick={() => federatedLogout()}>
    Signout of keycloak
  </button>
}