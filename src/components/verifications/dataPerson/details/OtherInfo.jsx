import DetailField from "@/components/verifications/dataPerson/DetailField.jsx"

export default function OtherInfo({ person }) {
    return (
        <div className="p-10 w-full grid grid-cols-2">
            <div className="space-y-6">
                <DetailField label="MRZ Line 1" value={person.mrzLine1} />
                <DetailField label="MRZ Line 2" value={person.mrzLine2} />
                <DetailField label="MRZ Line 3" value={person.mrzLine3} />
            </div>
            <div className="space-y-6">
                
            <DetailField label={"External Database Ref ID"} value={person.externalDatabaseRefID} />
                <DetailField label="third Party Rederence" value={person.thirdPartyReference} />
            </div>
        </div>
    )
}