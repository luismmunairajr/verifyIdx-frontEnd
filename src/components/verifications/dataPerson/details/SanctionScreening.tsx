import { Person } from "../../type";
import DetailField from "../DetailField";

interface PersonDetailsProps {
    person: Person
}

export default function SanctionScreening({ person }: PersonDetailsProps) {
    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <DetailField label="Entry Date" value={person.screening.entryDate} />
                <DetailField label="name" value={person.screening.name} />
                <DetailField label="alias" value={person.screening.alias} />
                <DetailField label="alternative speling" value={person.screening.alternativeSpeling} />
                <DetailField label="position" value={person.screening?.sanction} />
            </div>
            <div className="space-y-6">
                <DetailField label="position" value={person.screening?.pep?.position} />
                <DetailField label="period" value={person.screening?.pep?.period} />
                <DetailField label="riskCategory" value={person.screening?.pep?.riskCategory} />
                <DetailField label="country" value={person.screening?.pep?.country} />
            </div>
            <div className="space-y-6">
                <DetailField label="age data" value={person.screening.ageData} />
                <DetailField label="dob" value={person.screening.DOB} />
                <DetailField label="details" value={person.screening.details} />
                <DetailField label="locations" value={person.screening.locations} />
            </div>
        </div>
    )
}