"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import cubeicon from "@/assets/cubeicon.svg";
import Image from "next/image";
import CreateKey from "@/components/admin-settings/apiKeys/CreateKey";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance_midleware";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ApiKeys() {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revokingKey, setRevokingKey] = useState("");

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const tenantId = session?.user?.tenantId;
      if (!tenantId) return;

      const response = await axiosInstance.get(`/tenants/${tenantId}/apikeys`);
      setApiKeys(response.data);
    } catch (error) {
      toast.error(t("errorLoadingKeys"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const revokeKey = async (apikeyId) => {
  try {
    setRevokingKey(apikeyId);
    const tenantId = session?.user?.tenantId;
    if (!tenantId || !apikeyId) return;

    await axiosInstance.post(
      `/tenants/${tenantId}/apikeys/${apikeyId}/revoke`);
    toast.success(t("keyRevoked"));
    fetchKeys();
  } catch (error) {
    toast.error(t("errorRevokingKey"));
    console.error(error);
  } finally {
    setRevokingKey("");
  }
};

  useEffect(() => {
    fetchKeys();
  }, [session]);

  return (
    <div className="p-6 space-y-6 dark:bg-zinc-900 w-full 2xl:w-[1000px]">
      <div className="border flex rounded-xl p-4">
        <div className="flex space-x-4 p-2">
          <Image src={cubeicon} alt="" />
          <div className="text-sm w-20">
            <h4>Verify IDX</h4>
            <p>Staging</p>
          </div>
          <div className="border-l border-gray-400 h-full" />
          <div>
            <h4 className="font-semibold text-sm">Client ID</h4>
            <div className="p-1 bg-zinc-200 rounded">
              <p className="text-xs text-zinc-500">client_01HYD87QD1Q6S0V4D8P49G4...</p>
            </div>
          </div>
          <div className="border-l border-gray-400 h-full" />
          <p className="text-sm">{t("staging")}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <h3 className="font-semibold">{t("active")}</h3>
        <CreateKey onCreated={fetchKeys} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-zinc-100 text-black">
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("secretKey")}</TableHead>
              <TableHead>{t("created")}</TableHead>
              <TableHead>{t("expiration")}</TableHead>
              <TableHead>{t("action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell>Secret Key</TableCell>
                <TableCell>
                  {key.status === "ACTIVE" ? "**********************" : t("revoked")}
                </TableCell>
                <TableCell>{new Date(key.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {key.revokedAt ? new Date(key.revokedAt).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>
                  {key.status === "ACTIVE" && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => revokeKey(key.apikeyId)} 
                        disabled={revokingKey === key.apikeyId}
                      >
                        {revokingKey === key.apikeyId ? t("revoking") : t("revoke")}
                      </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
