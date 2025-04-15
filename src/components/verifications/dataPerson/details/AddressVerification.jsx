import { useLanguage } from "@/components/language/language-provider"
import DetailField from "@/components/verifications/dataPerson/DetailField.jsx"

export default function AddressVerification({ person }) {
    const { t } = useLanguage()

    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label={t("address1")} value={person.address1} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("address2")} value={person.address2} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("address3")} value={person.address3} />
            </div>
        </div>
    )
}
