import { useSession } from "next-auth/react";
  

export function useRoles() {
  const { data, status } = useSession();
  const loading = status === "loading";

  const roles = Array.isArray(data?.roles) ? data.roles : [];

  return {
    roles,
    loading,
  };
}
