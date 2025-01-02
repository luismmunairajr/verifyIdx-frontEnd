'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import loginImage from "../../public/loginImage.svg"
import google from "../../public/google.svg"
import microsoft from "../../public/microsoft.svg"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import logo from "../../public/logo.svg"

export default function Home() {
  const router = useRouter()
  const dashboard = () => {
    router.push("/dashboard")
  }
  return (
    <div className="h-screen flex">
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-96 space-y-8 items-center justify-center">
          <div className="w-full space-y-2">
            <div className="pb-2">
              <Image src={logo} alt="logo"/>
            </div>
            <h2 className="text-2xl font-bold">Log in to your Account</h2>
            <p className="text-sm">Welcome Back! Select method to log in:</p>
          </div>
          <div className="w-full flex gap-4">
            <Button className="w-full bg-white border text-black gap-2 hover:bg-zinc-100"><Image src={google} alt="logo" className="size-4" />Google</Button>
            <Button className="w-full bg-white border text-black gap-2 hover:bg-zinc-100"><Image src={microsoft} alt="logo" className="size-4" />Microsoft</Button>
          </div>
          <div className="flex w-full items-center justify-center">
            <p className="text-sm">or continue with email</p>
          </div>
          <div className="gap-4 flex flex-col w-full">
            <Input placeholder="Email" />
            <Input placeholder="password" type="password" />
          </div>
          <div className="w-full flex justify-between">
            <div className="space-x-1 items-center justify-center">
              <Checkbox />
              <Label>Remember me</Label>
            </div>
            <Link href={"#"} className="text-blue-500 text-sm">Forgot Password</Link>
          </div>
          <Button className="w-full" onClick={dashboard}>Log in</Button>
          <p className="text-sm">Don't have an account? <Link href={"#"} className="text-blue-500 font-semibold">Create an account</Link></p>
        </div>
      </div>
      <div className="w-1/2 h-full bg-gradient-to-r to-blue-800 from-blue-500">
      </div>
    </div>
  )
}
