"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data, status } = useSession();

  useEffect(() => {
    if (!data && status === "unauthenticated") {
      signIn("keycloak");
    }
  }, [data, status]);

  return <>{children}</>;
}
