import DetailField from "@/components/verifications/dataPerson/DetailField.jsx"
import { useLanguage } from "@/components/language/language-provider"
export default function SessionInfo({ person }) {
    const { t } = useLanguage()

    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label={t("platform")} value={person.platform} />
                <DetailField label={t("appId")} value={person.appID} />
                <DetailField label={t("userAgent")} value={person.userAgent} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("deviceModel")} value={person.deviceModel} />
                <DetailField label={t("deviceSDKVersion")} value={person.deviceSDKVersion} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("ipAddress")} value={person.ipAddress} />
                <DetailField label={t("startedAt")} value={person.startedAt} />
            </div>
        </div>
    )
}
