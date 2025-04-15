"use client";

import "./globals.css";
import ClientLayout from "./layoutClient";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"], weight: ["400"] });
import { Providers } from "./Providers";
import SessionGuard from "@/components/SessionGuard";
import { LanguageProvider } from "@/components/language/language-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <SessionGuard>
              <LanguageProvider>
                <ClientLayout>{children}</ClientLayout>
              </LanguageProvider>
            </SessionGuard>
          </Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
