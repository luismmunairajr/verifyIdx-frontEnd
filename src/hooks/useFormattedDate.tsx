import { useMemo } from "react";
import { useLanguage } from "@/components/language/language-provider";

export function useFormattedDate(dateString: string | undefined): string {
  const { t } = useLanguage();

  const formattedDate = useMemo(() => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("pt-PT", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${t("of")} ${month} ${t("of")} ${year} ${t("at")} ${hours}:${minutes}`;
  }, [dateString, t]);

  return formattedDate;
}
