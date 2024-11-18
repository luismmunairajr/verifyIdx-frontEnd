import { Person } from "../../type";
import DetailField from "../DetailField";

interface PersonDetailsProps {
    person: Person
}

export default function PersonDetails({ person }: PersonDetailsProps) {
    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label="first name" value={person.details.firstName} />
                <DetailField label="last name" value={person.details.lastName} />
                <DetailField label="full name" value={person.details?.fullName} />
                <DetailField label="father name" value={person.details.fatherName} />
                <DetailField label="mother name" value={person.details.motherName} />
            </div>
            <div className="space-y-6">
                <DetailField label="sex" value={person.details.sex} />
                <DetailField label="date of birth" value={person.details.dateOfBirth} />
                <DetailField label="place of birth" value={person.details.placeOfBirth} />
                <DetailField label="adress" value={person.details.address} />
                <DetailField label="height" value={person.details.height} />
            </div>
            <div className="space-y-6">
                <DetailField label="marital status" value={person.details.maritalStatus} />
                <DetailField label="b.i number" value={person.details.bi} />
                <DetailField label="issued b.i" value={person.details.issuedBI} />
                <DetailField label="issuance date b.i" value={person.details.issuanceDateBI} />
                <DetailField label="expiry date b.i" value={person.details.expiryDateBI} />
            </div>
        </div>
    );
}