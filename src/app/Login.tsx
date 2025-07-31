import Image from "next/image";
import logo from "@/assets/logo.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="h-screen flex">
      <Image src={logo} alt="logo" />
      <Login />
    </div>
  );
}
