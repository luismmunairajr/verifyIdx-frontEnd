import { useLanguage } from "@/components/language/language-provider"

export default function Badges({ person }) {
  const { t } = useLanguage()

  return (
    <div className="w-full flex space-x-2 justify-center 2xl:justify-start 2xl:pl-20 text-neutral-100 text-sm">
      {person.auditTrailImage && (
        <div className="bg-blue-500 p-2 rounded-lg">{t("livenessVerified")}</div>
      )}
      {person.categories === "PEP" && (
        <div className="bg-red-500 p-2 rounded-lg">{t("pep")}</div>
      )}
      {person.fullName !== "N/A" && (
        <div className="bg-green-500 p-2 rounded-lg">{t("documentScan")}</div>
      )}
    </div>
  )
}
