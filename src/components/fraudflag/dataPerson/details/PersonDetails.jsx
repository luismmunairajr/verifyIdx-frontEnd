import DetailField from "@/components/verifications/dataPerson/DetailField.jsx"
import { useLanguage } from "@/components/language/language-provider";

export default function PersonDetails({ person }) {
    const { t } = useLanguage()

    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label={t("fullName")} value={person.fullName} />
                <DetailField label={t("fatherFirstName")} value={person.fatherName} />
                <DetailField label={t("motherFirstName")} value={person.motherName} />
                <DetailField label={t("idNumber")} value={person.idNumber} />
                <DetailField label={t("sex")} value={person.sex} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("height")} value={person.height} />
                <DetailField label={t("dateOfBirth")} value={person.dateOfBirth} />
                <DetailField label={t("placeOfBirth")} value={person.placeOfBirth} />
                <DetailField label={t("maritalStatus")} value={person.customField1} />
                <DetailField label={t("issuingAuthority")} value={person.issuingAuthority} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("dateOfExpiration")} value={person.dateOfExpiration} />
                <DetailField label={t("dateOfIssue")} value={person.dateOfIssue} />
                <DetailField label={t("documentCountry")} value={person.documentCountry} />
                <DetailField label={t("templateName")} value={person.templateName} />
                <DetailField label={t("templateType")} value={person.templateType} />
            </div>
        </div>
    );
}
