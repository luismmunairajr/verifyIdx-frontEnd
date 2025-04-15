import DetailField from "@/components/verifications/dataPerson/DetailField.jsx"
import { useLanguage } from "@/components/language/language-provider"

export default function OtherInfo({ person }) {
    const { t } = useLanguage()

    return (
        <div className="p-10 w-full grid grid-cols-2">
            <div className="space-y-6">
                <DetailField label={t("mrzLine1")} value={person.mrzLine1} />
                <DetailField label={t("mrzLine2")} value={person.mrzLine2} />
                <DetailField label={t("mrzLine3")} value={person.mrzLine3} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("externalDatabaseReferenceId")} value={person.externalDatabaseRefID} />
                <DetailField label={t("thirdPartyReference")} value={person.thirdPartyReference} />
            </div>
        </div>
    )
}
