
"use client";

import Loading from "@/components/Loading";
import { useRoles } from "./useRoles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/components/language/language-provider";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { roles, loading } = useRoles();
  const router = useRouter();
  const { t } = useLanguage();

  const isAllowed =
    !allowedRoles ||
    roles.some((role) =>
      allowedRoles.map((r) => r.toUpperCase()).includes(role)
    );

  useEffect(() => {
    if (!loading && (roles.length === 0 || !isAllowed)) {
      router.push("/unauthorized");
    }
  }, [loading, roles, isAllowed, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (roles.length > 0 && isAllowed) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-screen gap-2 flex flex-col items-center justify-center">
      <p className="font-semibold text-xl">{t("checkingPermission")}</p>
      <Loading />
    </div>
  );
}
