import Loading from "@/components/Loading";
import { useRoles } from "./useRoles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/components/language/language-provider";

import { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { roles, loading } = useRoles();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading) {
      if (roles.length === 0) {
        router.push("/unauthorized");
      }
    }
  }, [loading, roles, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        {" "}
        <Loading />{" "}
      </div>
    );
  }

  if (roles.length > 0) {
    return <>{children}</>;
  }
  return (
    <div className="h-screen w-screen gap-2 flex flex-col items-center justify-center">
      <p className="font-semibold text-xl">{t("checkingPermission")}</p>
      <Loading/>
    </div>
  );
}
