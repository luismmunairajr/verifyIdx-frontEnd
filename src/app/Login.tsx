import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Loading from "@/components/Loading";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from "@/components/Login";
import Logout from "@/components/Logout";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session) {
      return (
        <div>
          <div>Your name is {session.user?.name}</div>
          <div>
            <Logout />
          </div>
        </div>
      );
    }
  }
  return (
    <div className="h-screen flex">
      <Image src={logo} alt="logo" />
      <Login />
    </div>
  );
}
