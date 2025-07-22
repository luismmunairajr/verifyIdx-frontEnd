import { useSession } from "next-auth/react";

export function useRoles() {
  const { data, status } = useSession({
    required: true, 
    refetchInterval: 0,
  });

  const loading = status === "loading";
  const roles = Array.isArray(data?.roles) ? data.roles : [];

  return { roles, loading };
}
