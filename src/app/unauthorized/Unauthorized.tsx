"use client"
import { useLanguage } from "@/components/language/language-provider";
import federatedLogout from "@/lib/federatedLogout";

export default function Unauthorized() {
  const { t } = useLanguage();
  return (
  <div className="flex flex-col space-y-4 h-screen w-full justify-center items-center">
        <h1 className="text-3xl font-semibold">{t("unauthorized")}</h1>
        <p>{t("unauthorizedDescription")}</p>
        <button onClick={() => federatedLogout()} className="px-6 py-2 rounded-xl hover:bg-blue-600 bg-blue-500 text-white">{t("logout")}</button>
    </div>)
}
