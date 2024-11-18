'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter()
  const dashboard = () => {
    router.push("/dashboard")
  }
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-sm space-y-4 p-5">
      <div className="flex flex-col items-center justify-center text-center w-full text-xs md:text-sm">
        <h1 className="text-blue-800 md:text-3xl text-2xl">Welcome to Verify IDX</h1>
        <p>Thank you for your choice</p>
        <p>To start to enjoying our benefits, let make login </p>
      </div>
      <div className="flex flex-col space-y-4 md:text-base text-xs">
        <Input type="email" className="rounded-full w-72 focus-visible:ring-2" placeholder="Email" />
        <Input type="password" className="rounded-full w-72 focus-visible:ring-2"  placeholder="Password" />
        <Button onClick={dashboard} className="rounded-full w-72 bg-blue-800 hover:bg-transparent hover:text-blue-500 hover:ring-2 hover:ring-blue-800">Sign in</Button>
      </div>
      <p className="text-center">By signing up, you agree to our <Link href={"/about/terms-of-service"} className="text-blue-800 hover:underline">Terms of Service</Link></p>
      <p className="fixed bottom-6 text-center">All rights reserved to <Link href="https://www.bluestringco.co" className="text-blue-800 hover:underline" target="_blank">Bluestring Consulting Limitada</Link> </p>
    </div>
  );
}
