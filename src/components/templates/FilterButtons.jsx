"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language/language-provider";

export default function FilterButtons() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="ghost" onClick={() => router.push("/templates/saved")}>
        {t("myTemplates")}
      </Button>
     // <Button variant="ghost">{t("artificialIntelligence")}</Button>
      <Button variant="ghost">{t("digitalSignature")}</Button>
      <Button variant="ghost">{t("identityVerification")}</Button>
    //  <Button variant="ghost">{t("watchlist")}</Button>
    //  <Button variant="ghost">{t("support")}</Button>
    //  <Button variant="ghost">{t("automation")}</Button>
    //  <Button variant="ghost">{t("security")}</Button>
    </div>
  );
}
