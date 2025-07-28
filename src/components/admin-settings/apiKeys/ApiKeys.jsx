"use client";

import { useEffect, useState, useCallback } from "react";
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
import CreateKey from "./CreateKey";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance";
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

  const stage = process.env.TEXT_STAGE || "unknown";

  const fetchKeys = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/axios/admin-settings/apikeys`);
      setApiKeys(response.data);
    } catch (error) {
      toast.error(t("errorLoadingKeys"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const revokeKey = async (apikeyId) => {
    try {
      setRevokingKey(apikeyId);
      await axiosInstance.delete(`/api/axios/admin-settings/apikeys?apikeyId=${apikeyId}`);
      toast.success(t("keyRevoked"));
      await fetchKeys();
    } catch (error) {
      toast.error(t("errorRevokingKey"));
      console.error(error);
    } finally {
      setRevokingKey("");
    }
  };

  useEffect(() => {
    if (session) fetchKeys();
  }, [session, fetchKeys]);

  const stageText = (() => {
    switch (stage) {
      case "production":
        return t("production");
      case "development":
        return t("development");
      case "staging":
        return t("staging");
      default:
        return t("unknown");
    }
  })();

  return (
    <div className="p-6 space-y-6 dark:bg-zinc-900 w-full 2xl:w-[1000px]">
      {/* Header */}
      <div className="border flex rounded-xl p-4">
        <div className="flex space-x-4 p-2 items-center">
          <Image src={cubeicon} alt="Cube Icon" />
          <div className="text-sm w-20">
            <h4>Verify IDX</h4>
            <p>{stageText}</p>
          </div>
          <div className="border-l border-gray-400 h-full" />
          <div>
            <h4 className="font-semibold text-sm">Client ID</h4>
            <div className="p-1 bg-zinc-200 rounded">
              <p className="text-xs text-zinc-500">{ session?.tenantId ?? "-"}</p>
            </div>
          </div>
          <div className="border-l border-gray-400 h-full" />
          <p className="text-sm">{stageText}</p>
        </div>
      </div>

      {/* Title & Add Button */}
      <div className="flex items-center justify-between px-2">
        <h3 className="font-semibold">{t("active")}</h3>
        <CreateKey onCreated={fetchKeys} />
      </div>

      {/* Table or Loader */}
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
                  {key.status === "ACTIVE"
                    ? "**********************"
                    : t("revoked")}
                </TableCell>
                <TableCell>{new Date(key.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {key.revokedAt
                    ? new Date(key.revokedAt).toLocaleDateString()
                    : "-"}
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
