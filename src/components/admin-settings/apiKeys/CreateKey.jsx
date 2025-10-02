"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/components/language/language-provider";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/api/axios/axiosInstance";
import { toast } from "sonner";

export default function CreateKey({ onCreated }) {
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [nameInput, setNameInput] = useState(""); // Novo campo para nome da chave
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { t } = useLanguage();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputValue);
      setCopied(true);
      setHasCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error("Erro ao copiar texto:", err);
    }
  };

  const handleCreateKey = async () => {
    if (!nameInput.trim()) {
      toast.error(t("nameRequired") || "Nome da chave é obrigatório.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/api/axios/admin-settings/apikeys`, {
        name: nameInput.trim(),
      });

      if (response.status === 201 || response.status === 200) {
        const newKey = response.data?.apiKey?.key;
        if (newKey) {
          setInputValue(newKey);
          toast.success(t("keyCreated") || "Chave criada com sucesso");
        } else {
          toast.error(t("invalidKeyResponse") || "Resposta inválida ao criar chave");
        }
      } else {
        toast.error(t("failedCreateKey") || "Falha ao criar chave");
      }
    } catch (error) {
      console.error("Erro ao criar chave:", error);
      toast.error(t("errorCreateKey") || "Erro ao criar a chave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen && hasCopied) {
          onCreated?.();
          setHasCopied(false);
          setNameInput("");
          setInputValue("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={loading}>
          {loading ? t("creating") : t("createKey")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>{t("createKey")}</DialogTitle>
          <DialogDescription>{t("createKeySubtitle")}</DialogDescription>
        </DialogHeader>

        {/* Nome da Chave */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("keyName") || "Nome da chave"}</label>
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder={t("enterKeyName") || "Digite um nome para a chave"}
          />
        </div>

        {/* Resultado */}
        <div className="flex items-center space-x-2">
          <Input value={inputValue} disabled className="flex-1" />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="icon"
            className="h-10 w-10"
            disabled={!inputValue}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {copied && (
          <p className="text-sm mt-2 text-red-500">
            {t("savekey") || "Copie e salve sua chave, ela não será mostrada novamente!"}
          </p>
        )}

        <div className="flex justify-end">
          <Button onClick={handleCreateKey} disabled={loading || !nameInput.trim()}>
            {loading ? t("creating") || "Criando..." : t("createKey") || "Criar chave"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
