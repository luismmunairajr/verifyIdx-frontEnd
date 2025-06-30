"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/components/language/language-provider";

export default function CreateKey() {
  const [copied, setCopied] = useState(false);
  const inputValue = "01HYD87QD1Q6S0V4D8P49G4NDNQ8921349";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 30000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const { t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("createKey")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("createKey")}</DialogTitle>
          <DialogDescription>
            {t("createKeySubtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={inputValue} disabled className="flex-1" />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="icon"
            className="h-10 w-10"
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
            {t("savekey")}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
