'use client'

import "./globals.css";
import ClientLayout from "./layoutClient";
import { Poppins } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({ subsets: ['latin'], weight: ["400"] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </SessionProvider>
        <Toaster/>
      </body>
    </html>
  );
}
