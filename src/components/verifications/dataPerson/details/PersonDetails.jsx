import DetailField from "@/components/verifications/dataPerson/DetailField.jsx";

export default function PersonDetails({ person }) {
    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label="Full Name" value={person.fullName} />
                <DetailField label="Father's Name" value={person.fatherFirstName} />
                <DetailField label="Mother's Name" value={person.motherFirstName} />
                <DetailField label="ID Number" value={person.idNumber} />
                <DetailField label="Sex" value={person.sex} />
            </div>
            <div className="space-y-6">
            <DetailField label="Height" value={person.height} />
                <DetailField label="Date of Birth" value={person.dateOfBirth} />
                <DetailField label="Place of Birth" value={person.placeOfBirth} />
                <DetailField label="Marital Status" value={person.customField1} />
                <DetailField label="Issuing Authority" value={person.issuingAuthority} />
                
            </div>
            <div className="space-y-6">
                <DetailField label="Date of Expiration" value={person.dateOfExpiration} />
                <DetailField label="Date of Issue" value={person.dateOfIssue} />
                <DetailField label="Document Country" value={person.documentCountry} />
                <DetailField label="Template Name" value={person.templateName} />
                <DetailField label="Template Type" value={person.templateType} />
            </div>
        </div>
    );
}
