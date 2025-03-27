"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data } = useSession();
  useEffect(() => {
    if (!data && status === "unauthenticated") {
      signIn("keycloak");
    }
  }, [data]);

  return <>{children}</>;
}