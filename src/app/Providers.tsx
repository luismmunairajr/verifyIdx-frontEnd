import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { useAutoLogout } from "@/hooks/useAutoLogout";

export function Providers({ children }: { children: ReactNode }) {
  
       useAutoLogout();
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}