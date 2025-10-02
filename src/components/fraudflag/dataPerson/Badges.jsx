import { useLanguage } from "@/components/language/language-provider"

export default function Badges({ person }) {
  const { t } = useLanguage()

  return (
    <div className="w-full flex space-x-2 justify-start sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 2xl:pl-20 text-neutral-100 text-sm
">
            {person.auditTrailImage && (
        <div className={`p-2 rounded-lg ${person.livenessVerified ? "bg-green-500" : "bg-red-500"}`}>
          {person.livenessVerified ? t("livenessVerified") : t("livenessFailed")}
           </div>
      )}

      {person.categories === "PEP" && (
        <div className="bg-red-500 p-2 rounded-lg">{t("pep")}</div>
      )}
            {person.fullName !== "--" && (
              <div className="bg-green-500 p-2 rounded-lg">{t("documentScan")}</div>
            )}
    </div>
  )
}
