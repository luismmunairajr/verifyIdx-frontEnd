'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter()
  const dashboard = () => {
    router.push("/dashboard")
  }

  const { data: session } = useSession();

  if (session) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center text-sm space-y-4 p-5">
        <div className="flex flex-col items-center justify-center text-center w-full text-xs md:text-sm space-y-4">
          <h1 className="text-blue-800 md:text-3xl text-2xl">Welcome to Verify IDX</h1>
          <p>Thank you for your choice {session.user?.name}</p>
          <p>To start to enjoying our benefits, let make login </p>
          <Button onClick={dashboard} className="rounded-full w-72 bg-blue-800 hover:bg-transparent hover:text-blue-500 hover:ring-2 hover:ring-blue-800">Start</Button>
          
          <Button onClick={()=> signOut()} className="rounded-full w-72 bg-red-800 hover:bg-transparent hover:text-red-500 hover:ring-2 hover:ring-red-800">Sign Out</Button>
        </div>
        <p className="fixed bottom-6 text-center">All rights reserved to <Link href="https://www.bluestringco.co" className="text-blue-800 hover:underline" target="_blank">Bluestring Consulting Limitada</Link> </p>
      </div>
    )
  }

  return(
    <div className="flex items-center justify-center flex-col h-screen w-screen space-y-10">
      <h1>You're not autenticated</h1>
      <button onClick={() => signIn()} className="bg-blue-500 px-4 py-2 rounded">Login</button>
    </div>
  )
}
