import { Person } from "../../type";
import DetailField from "../DetailField";

interface PersonDetailsProps {
    person: Person
}

import { useLanguage } from "@/components/language/language-provider";

export default function PersonDetails({ person }: PersonDetailsProps) {
    const { t } = useLanguage()
    
    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label={t("fullName")} value={person.details.firstName} />
                <DetailField label={t("fatherFirstName")} value={person.details.lastName} />
                <DetailField label={t("motherFirstName")} value={person.details?.fullName} />
                <DetailField label={t("idNumber")} value={person.details.fatherName} />
                <DetailField label={t("sex")} value={person.details.motherName} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("height")} value={person.details.sex} />
                <DetailField label={t("dateOfBirth")} value={person.details.dateOfBirth} />
                <DetailField label={t("placeOfBirth")} value={person.details.placeOfBirth} />
                <DetailField label={t("maritalStatus")} value={person.details.address} />
                <DetailField label={t("issuingAuthority")} value={person.details.height} />
            </div>
            <div className="space-y-6">
                <DetailField label={t("dateOfExpiration")} value={person.details.maritalStatus} />
                <DetailField label={t("dateOfIssue")} value={person.details.bi} />
                <DetailField label={t("documentCountry")} value={person.details.issuedBI} />
                <DetailField label={t("templateName")} value={person.details.issuanceDateBI} />
                <DetailField label={t("templateType")} value={person.details.expiryDateBI} />
            </div>
        </div>
    );
}